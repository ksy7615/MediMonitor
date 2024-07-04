import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from './setTools.js';

const content = document.getElementById('content');
const viewportGrid = document.createElement('div');

content.appendChild(viewportGrid);

// 우클릭 방지
content.oncontextmenu = (e) => e.preventDefault();

// URL에서 studyKey 추출
const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];

let studyInfo = "";

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

        return series.seriesList;
    } catch (e) {
        console.log("에러 출력:", e);
    }
}

// element 생성 함수
const createViewportElement = (size) => {
    const element = document.createElement('div');
    element.style.width = size;
    element.style.height = size;
    element.oncontextmenu = (e) => e.preventDefault(); // 우클릭 방지
    return element;
}

// 시리즈별로 이미지 랜더
const fetchDataAndRender = async (seriesList) => {
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

        } catch (e) {
            console.log("에러 : ", e);
        }

        const element = createViewportElement('500px');
        viewportGrid.appendChild(element);
        await render(imageIds, element, seriesKey);
    }

    content.appendChild(viewportGrid);
}

// 렌더링 함수
const render = (imageIds, element, seriesKey) => {
    const renderingEngineId = `myRenderingEngine-${seriesKey}`;
    const viewportId = `CT_AXIAL_STACK-${seriesKey}`;

    // 각 뷰포트에 툴 적용
    try {
        tools.setTools(viewportId, renderingEngineId);
    }catch (e){
        console.log(e);
    }

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
