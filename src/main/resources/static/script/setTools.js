import {init as csToolsInit, MagnifyTool, TrackballRotateTool, ZoomTool , StackScrollMouseWheelTool} from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";

const {ToolGroupManager, Enums: csToolsEnums} = cornerstoneTools;
const {MouseBindings} = csToolsEnums;

const toolGroups = new Map();

const setTools = (viewportId, renderingEngineId) => {
    // 툴 초기화
    csToolsInit();

    // 툴 그룹 uid생성
    const toolGroupId = `toolGroupId-${viewportId}`;
    console.log('toolId : ' + toolGroupId);

    // 툴을 항상 추가 시도하고, 이미 추가된 경우 예외를 무시
    try {
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
    } catch (e) {
        if (e.message !== "StackScrollMouseWheel has already been added globally") {
            console.log(e);
        }
    }

    // 툴 그룹이 이미 존재하는지 확인하고 가져오기
    let toolGroup = toolGroups.get(toolGroupId);
    if (!toolGroup) {
        // 툴 그룹 생성
        toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

        // 툴 추가
        toolGroup.addTool(StackScrollMouseWheelTool.toolName);

        // 툴 활성화
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

        // 툴 그룹을 Map에 저장
        toolGroups.set(toolGroupId, toolGroup);
    }

    // 뷰포트에 툴 적용
    toolGroup.addViewport(viewportId, renderingEngineId);

    console.log(toolGroup);
}

export { setTools };
