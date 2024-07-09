import {
    init as csToolsInit,
    ZoomTool,
    WindowLevelTool,
    PanTool,
    StackScrollMouseWheelTool,
    removeTool, LengthTool, ProbeTool
} from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";
const { ToolGroupManager } = cornerstoneTools;
const { MouseBindings } = cornerstoneTools.Enums;

let toolGroup;

const setTools = (viewports, renderingEngineId, toolGroupId) => {
    // 툴 초기화
    csToolsInit();

    if (!toolGroup) {
        // 툴 그룹 ID 생성 및 툴 그룹 생성 (툴 그룹은 한 번만 생성)
        toolGroupId = `toolGroupId`;
        console.log('toolId : ' + toolGroupId);

        // 툴 그룹에 툴 추가
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(LengthTool);

        // 툴 그룹 생성
        toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
        console.log(toolGroup);

        // 툴 적용
        toolGroup.addTool(StackScrollMouseWheelTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(LengthTool.toolName);

        // 툴 활성화 (기본 도구 설정)
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName, {
            bindings: [{ mouseButton: MouseBindings.Auxiliary }],
        });
    }

    // 모든 뷰포트에 툴 그룹 적용
    viewports.forEach(viewport => {
        const viewportId = `CT_AXIAL_STACK-${viewport.id}`;
        toolGroup.addViewport(viewportId, renderingEngineId);
    });
}

const activateTool = (toolName, toolGroupId) => {
    const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
    console.log(toolGroup);
    console.log(toolName.toolName);
    if (toolGroup) {
        const toolNames = [
            ZoomTool.toolName,
            WindowLevelTool.toolName,
            PanTool.toolName,
            LengthTool.toolName
        ];

        toolNames.forEach(tool => {
            toolGroup.setToolPassive(tool, {
                removeAllBindings : true
            });
        });

        toolGroup.setToolActive(toolName.toolName, {
            bindings: [{ mouseButton: MouseBindings.Primary }],
        });

    }
}

export { setTools, activateTool };
