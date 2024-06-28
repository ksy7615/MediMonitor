import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import { init as csToolsInit } from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";

// 뷰 포트 생성
const content = document.getElementById('content');
const element = document.createElement('div');

// 툴 정의
const {
    MagnifyTool,
    TrackballRotateTool,
    ZoomTool,
    StackScrollMouseWheelTool,
    ToolGroupManager,
    Enums: csToolsEnums,
} = cornerstoneTools;

const { MouseBindings } = csToolsEnums;

element.oncontextmenu = (e) => e.preventDefault();
element.style.width = '500px';
element.style.height = '500px';
content.appendChild(element);

// URL에서 studyKey와 seriesKey 추출
const path = window.location.pathname;
const pathParts = path.split('/');
const studyKey = pathParts[2];
const seriesKey = pathParts[3];

// 초기화 함수
const init = async () => {
    await cornerstone.init();

    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;

    var config = {
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

// 요청
const fetchDataAndRender = async () => {
    const endpoint = `http://localhost:8080/api/images/${studyKey}/${seriesKey}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);

        // 시리즈 배열
        const imageIds = await Promise.all(data.map(async (item) => {
            const { path, fname, id } = item;
            const { studykey, serieskey, imagekey } = id;
            const dicomEndpoint = `http://192.168.30.70:8081/api/v1/dicom/studies/${studykey}/series/${serieskey}/instances/${imagekey}`;

            const fileResponse = await fetch(dicomEndpoint);
            const blob = await fileResponse.blob();
            const dicomUrl = `dicomweb:${URL.createObjectURL(blob)}`;

            return dicomUrl;
        }));

        render(imageIds);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const render = async (imageIds) => {
    const renderingEngineId = 'myRenderingEngine';
    const viewportId = 'CT_AXIAL_STACK';

    // 1. 툴을 먼저 셋
    try {
        setTools(viewportId, renderingEngineId);
    } catch (exception) {
        console.log(exception)
    }

    const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

    const viewportInput = {
        viewportId,
        element,
        type: cornerstone.Enums.ViewportType.STACK,
    };

    renderingEngine.enableElement(viewportInput);
    const viewport = renderingEngine.getViewport(viewportInput.viewportId);

    await viewport.setStack(imageIds, 0);

    // 뷰포트 리랜더링
    viewport.render();
};

const setTools = (viewportId, renderingEngineId) => {
    // 툴 추가
    csToolsInit();

    const toolGroupId = 'NAVIGATION_TOOL_GROUP_ID';

    cornerstoneTools.addTool(MagnifyTool);
    cornerstoneTools.addTool(TrackballRotateTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool); // 마우스 휠 스크롤 툴 추가

    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    toolGroup.addTool(MagnifyTool.toolName, { cursor: 'move' });
    toolGroup.addTool(TrackballRotateTool.toolName, { cursor: 'crosshair' });
    toolGroup.addTool(ZoomTool.toolName, { cursor: 'zoom-in' });
    toolGroup.addTool(StackScrollMouseWheelTool.toolName);

    // 툴 활성화
    toolGroup.setToolActive(MagnifyTool.toolName, {
        bindings: [{ mouseButton: MouseBindings.Primary }],
    });

    toolGroup.setToolActive(TrackballRotateTool.toolName, {
        bindings: [{ mouseButton: MouseBindings.Auxiliary }],
    });

    toolGroup.setToolActive(ZoomTool.toolName, {
        bindings: [{ mouseButton: MouseBindings.Secondary }],
    });

    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName); // 마우스 휠 스크롤 활성화

    toolGroup.addViewport(viewportId, renderingEngineId);
};

// 초기화 후 데이터 페치 및 렌더링
init().then(fetchDataAndRender).catch(console.error);
