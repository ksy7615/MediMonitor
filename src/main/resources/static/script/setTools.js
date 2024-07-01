import {init as csToolsInit, MagnifyTool, TrackballRotateTool, ZoomTool , StackScrollMouseWheelTool} from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";

const {ToolGroupManager, Enums: csToolsEnums} = cornerstoneTools;
const {MouseBindings} = csToolsEnums;


const setTools = (viewportId, renderingEngineId) => {
    // 툴 초기화
    csToolsInit();

    // 툴 그룹 uid생성
    const toolGroupId = 'toolGroupId';

    // 툴그룹에 툴 추가
    cornerstoneTools.addTool(MagnifyTool);
    cornerstoneTools.addTool(TrackballRotateTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);

    // 툴 그룹 생성
    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    // 툴 적용
    toolGroup.addTool(MagnifyTool.toolName, {cursor:'move'});
    toolGroup.addTool(TrackballRotateTool.toolName, {cursor:'crosshair'});
    toolGroup.addTool(ZoomTool.toolName, {cursor:'zoom-in'});
    toolGroup.addTool(StackScrollMouseWheelTool.toolName);

    // 툴 활성화
    toolGroup.setToolActive(MagnifyTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Primary,
            }
        ],
    });

    toolGroup.setToolActive(TrackballRotateTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Auxiliary,
            }
        ],
    });

    toolGroup.setToolActive(ZoomTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Secondary,
            }
        ],
    });

    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

    // 뷰포트에 툴 적용
    toolGroup.addViewport(viewportId, renderingEngineId);
}

export { setTools };