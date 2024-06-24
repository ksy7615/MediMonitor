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
    ToolGroupManager,
    Enums: csToolsEnums,
} = cornerstoneTools;

const { MouseBindings } = csToolsEnums;

element.oncontextmenu = (e) => e.preventDefault();
element.style.width = '500px';
element.style.height = '500px';
content.appendChild(element);

// 파일 리딩
const input = document.getElementById("file");

input.addEventListener("change", (e) => {
    const files = e.target.files;

    const reader = new FileReader();
    reader.onload = (file) => {
        const data = file.target.result;
        render(data);
    };
    reader.readAsArrayBuffer(files[0]);
});

const render = async (arrayBuffer) => {
    const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;

    const imageIds = [imageId];

    const renderingEngineId = 'myRenderingEngine';
    const viewportId = 'CT_AXIAL_STACK';

    // 1. 툴을 먼저 셋
    try {
        setTools(viewportId, renderingEngineId);
    }catch (exception) {
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

    // 2.이미지가 로드된 후에 툴 설정을 수행
    // setTools(viewportId, renderingEngineId);

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

    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    toolGroup.addTool(MagnifyTool.toolName, { cursor: 'move' });
    toolGroup.addTool(TrackballRotateTool.toolName, { cursor: 'crosshair' });
    toolGroup.addTool(ZoomTool.toolName, { cursor: 'zoom-in' });

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

    toolGroup.addViewport(viewportId, renderingEngineId);
};

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

init();