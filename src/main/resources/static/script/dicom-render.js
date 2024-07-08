import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from './setTools.js';

const content = document.getElementById('content');
const viewportGrid = document.createElement('div');
viewportGrid.style.display = 'grid';
viewportGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
content.appendChild(viewportGrid);

const toggleBox = document.getElementById('toggle-box');
const thumbnailContainer = document.createElement('div');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.flexDirection = 'column';
thumbnailContainer.style.marginRight = '10px';
toggleBox.appendChild(thumbnailContainer);

// 우클릭 방지
content.oncontextmenu = (e) => e.preventDefault();

const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];

let studyInfo = "";
let seriesList = [];
let seriesImages = {};
let viewports = [];

// 초기화
let renderingEngine;
const init = async () => {
    await cornerstone.init();

    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;

    const config = {
        maxWebWorkers: navigator.hardwareConcurrency || 1,
        startWebWorkersOnDemand: true,
        taskConfiguration: {
            decodeTask: {
                initializeCodecsOnStartup: false,
            },
            sleepTask: {
                sleepTime: 3000,
            },
        },
    };

    cornerstoneDICOMImageLoader.webWorkerManager.initialize(config);
    renderingEngine = new cornerstone.RenderingEngine('myRenderingEngine'); // 렌더링 엔진 생성
};

// 시리즈 키값 가져오기
const fetchSeriesKeys = async () => {
    const seriesEndpoint = `/api/detail/${studyKey}`;

    try {
        const response = await fetch(seriesEndpoint, { method: 'GET' });
        const series = await response.json();

        console.log("series:", series);
        studyInfo = series.study;
        seriesList = series.seriesList;

        return series.seriesList;
    } catch (e) {
        console.log("에러 출력:", e);
    }
}

// div 생성
const createViewportElement = (size, id) => {
    const element = document.createElement('div');
    element.id = `viewport-${id}`;
    element.style.width = size;
    element.style.height = size;
    element.style.border = '1px solid black';
    element.style.margin = '5px';
    element.className = 'parentDiv';
    element.setAttribute('data-value', id);
    element.oncontextmenu = (e) => e.preventDefault();
    element.ondrop = (e) => onDrop(e, element);
    element.ondragover = (e) => e.preventDefault();
    return element;
}

const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div');
    thumbnail.style.width = '100px';
    thumbnail.style.height = '100px';
    thumbnail.style.border = '1px solid black';
    thumbnail.style.margin = '5px';
    thumbnail.draggable = true;
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey);
    thumbnail.innerText = seriesKey;
    return thumbnail;
}

// 드래그 앤 드롭
const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey);
}

const onDrop = (e, element) => {
    e.preventDefault();
    const seriesKey = e.dataTransfer.getData('text/plain');
    const viewportId = `CT_AXIAL_STACK-${element.id}`;
    displaySeries(seriesKey, element, renderingEngine, viewportId);
    tools.setTools(viewportId, renderingEngine.id);  // 툴 재설정
}

const fetchDataAndRender = async (seriesList) => {
    const seriesPromises = seriesList.map(seriesKey => fetchSeriesImages(seriesKey));

    // 병렬로 모든 시리즈의 이미지를 가져오고 처리
    await Promise.all(seriesPromises);

    // 일단 50개 뷰포트
    for (let i = 0; i < 50; i++) {
        const element = createViewportElement('150px', i);
        viewportGrid.appendChild(element);
        viewports.push(element);
    }

    // 유효한 시리즈를 순서대로 각 뷰포트에 할당
    let validSeriesIndex = 0;
    for (let i = 0; i < viewports.length; i++) {
        while (validSeriesIndex < seriesList.length && (!seriesImages[seriesList[validSeriesIndex]] || seriesImages[seriesList[validSeriesIndex]].length === 0)) {
            validSeriesIndex++;
        }

        if (validSeriesIndex < seriesList.length) {
            const seriesKey = seriesList[validSeriesIndex];
            const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`;
            displaySeries(seriesKey, viewports[i], renderingEngine, viewportId);
            tools.setTools(viewportId, renderingEngine.id);  // 툴 설정
            validSeriesIndex++;
        }
    }

    content.appendChild(viewportGrid);
}

const fetchSeriesImages = async (seriesKey) => {
    const imageEndpoint = `/api/image/${studyKey}/${seriesKey}`;

    try {
        const response = await fetch(imageEndpoint, { method: 'POST' });
        const data = await response.json();

        const fileList = data.fileList;
        const imageIds = fileList.map(base64Data => {
            const byteArray = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
            const blob = new Blob([byteArray], { type: 'application/dicom' });
            return `dicomweb:${URL.createObjectURL(blob)}`;
        });

        if (imageIds.length > 0) {
            seriesImages[seriesKey] = imageIds;
        }
    } catch (e) {
        console.log("에러 : ", e);
    }
}

const displaySeries = (seriesKey, element, renderingEngine, viewportId) => {
    const imageIds = seriesImages[seriesKey];
    element.className = 'parentDiv';
    if (imageIds && imageIds.length !== 0) {
        try {
            render(imageIds, element, renderingEngine, viewportId);
        } catch (e) {
            console.log(e);
        }
    }
}

const render = (imageIds, element, renderingEngine, viewportId) => {
    const viewportInput = {
        viewportId: viewportId,
        element: element,
        type: cornerstone.Enums.ViewportType.STACK,
    };

    renderingEngine.enableElement(viewportInput);
    const viewport = renderingEngine.getViewport(viewportInput.viewportId);

    viewport.setStack(imageIds, 0);
    viewport.render();
};

const renderThumbnailsInOrder = (seriesList) => {
    seriesList.forEach(seriesKey => {
        if (seriesImages[seriesKey]) {
            const thumbnail = createThumbnailElement(seriesKey);
            thumbnailContainer.appendChild(thumbnail);
        }
    });
};

init()
    .then(fetchSeriesKeys)
    .then(seriesList => {
        fetchDataAndRender(seriesList)
            .then(() => renderThumbnailsInOrder(seriesList));
    })
    .catch(console.error);
