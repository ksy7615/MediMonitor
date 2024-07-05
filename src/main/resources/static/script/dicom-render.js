import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from './setTools.js';

const content = document.getElementById('content');
const viewportGrid = document.createElement('div');
viewportGrid.style.display = 'grid';
viewportGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
content.appendChild(viewportGrid);

const thumbnailContainer = document.createElement('div');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.flexDirection = 'column';
thumbnailContainer.style.marginRight = '10px';
content.appendChild(thumbnailContainer);

// 우클릭 방지
content.oncontextmenu = (e) => e.preventDefault();

// URL에서 studyKey 추출
const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];

let studyInfo = "";
let seriesList = [];
let seriesElements = {};
let seriesImages = {};
let viewports = [];

// Cornerstone 초기화
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

// element 생성 함수
const createViewportElement = (size, id) => {
    const element = document.createElement('div');
    element.id = `viewport-${id}`;
    element.style.width = size;
    element.style.height = size;
    element.style.border = '1px solid black';
    element.style.margin = '5px';
    element.className = 'parentDiv displayNone'; // 기본적으로 빈 뷰포트 스타일 적용
    element.setAttribute('data-value', id);
    element.oncontextmenu = (e) => e.preventDefault(); // 우클릭 방지
    element.ondrop = (e) => onDrop(e, element);
    element.ondragover = (e) => e.preventDefault();
    return element;
}

// 썸네일 생성 함수
const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div');
    thumbnail.style.width = '100px';
    thumbnail.style.height = '100px';
    thumbnail.style.border = '1px solid black';
    thumbnail.style.margin = '5px';
    thumbnail.draggable = true;
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey);
    thumbnail.innerText = seriesKey; // 썸네일 텍스트로 시리즈 키 표시
    return thumbnail;
}

// 드래그 시작 이벤트 핸들러
const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey);
}

// 드롭 이벤트 핸들러
const onDrop = (e, element) => {
    e.preventDefault();
    const seriesKey = e.dataTransfer.getData('text/plain');
    const renderingEngineId = `myRenderingEngine-${element.id}`;
    const viewportId = `CT_AXIAL_STACK-${element.id}`;
    displaySeries(seriesKey, element, renderingEngineId, viewportId);
}

// 시리즈별로 이미지 로드
const fetchDataAndRender = async (seriesList) => {
    // 썸네일 생성 및 추가
    for (const seriesKey of seriesList) {
        const imageEndpoint = `/api/image/${studyKey}/${seriesKey}`;

        let imageIds = [];
        try {
            const response = await fetch(imageEndpoint, { method: 'POST' });
            console.log("seriesKey : ", seriesKey);
            const list = await response.json();
            console.log(list);
            const files = list.fileList;

            files.forEach((base64) => {
                const binaryString = atob(base64);
                const arrayBuffer = Uint8Array.from(binaryString, c => c.charCodeAt(0));
                const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
                imageIds.push(imageId);
            });

            seriesImages[seriesKey] = imageIds;

            const thumbnail = createThumbnailElement(seriesKey);
            thumbnailContainer.appendChild(thumbnail);

        } catch (e) {
            console.log("에러 : ", e);
        }
    }

    // 빈 뷰포트 생성
    for (let i = 0; i < 50; i++) { // 50개 뷰포트 생성
        const element = createViewportElement('150px', i);
        viewportGrid.appendChild(element);
        viewports.push(element);
    }

    // 시리즈를 순서대로 로드
    for (let i = 0; i < seriesList.length && i < viewports.length; i++) {
        const renderingEngineId = `myRenderingEngine-${viewports[i].id}`;
        const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`;
        displaySeries(seriesList[i], viewports[i], renderingEngineId, viewportId);
    }

    content.appendChild(viewportGrid);
}

// 시리즈 표시 함수
const displaySeries = (seriesKey, element, renderingEngineId, viewportId) => {
    const imageIds = seriesImages[seriesKey];
    element.className = 'parentDiv'; // 시리즈가 로드된 뷰포트 스타일 적용
    if (imageIds || imageIds.length !== 0) {
        try {
            tools.setTools(viewportId, renderingEngineId);
        } catch (e) {
            console.log(e);
        }
    }
    render(imageIds, element, renderingEngineId, viewportId);
}

// 렌더링 함수
const render = (imageIds, element, renderingEngineId, viewportId) => {
    console.log('rendering imageIds:', imageIds); // 디버깅을 위해 추가
        // Rendering Engine 및 Viewport 설정
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

        const viewportInput = {
            viewportId: viewportId,
            element: element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportInput.viewportId);

        // 스택 설정
        viewport.setStack(imageIds, 0);

        // Viewport 렌더링
        viewport.render();

};

init().then(fetchSeriesKeys).then(fetchDataAndRender).catch(console.error);
