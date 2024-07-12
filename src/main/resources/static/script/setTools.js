import {
    init as csToolsInit,
    ZoomTool,
    WindowLevelTool,
    PanTool,
    StackScrollMouseWheelTool,
    LengthTool,
    ProbeTool,
    HeightTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    PlanarFreehandROITool,
    EraserTool,
    StackScrollTool,
    utilities
} from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";
const { ToolGroupManager } = cornerstoneTools;
const { MouseBindings } = cornerstoneTools.Enums;

let toolGroup;
const globalToolGroupId = `toolGroupId`;

const setTools = (viewports, renderingEngineId, toolGroupId) => {
    // 툴 초기화
    csToolsInit();

    if (!toolGroup) {
        // 툴 그룹 ID 생성 및 툴 그룹 생성 (툴 그룹은 한 번만 생성)
        toolGroupId = `toolGroupId`;

        // 툴 그룹에 툴 추가
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(PanTool);
        // 여기서부터 주석툴
        cornerstoneTools.addTool(LengthTool);
        cornerstoneTools.addTool(HeightTool);
        cornerstoneTools.addTool(ProbeTool);
        cornerstoneTools.addTool(RectangleROITool);
        cornerstoneTools.addTool(EllipticalROITool);
        cornerstoneTools.addTool(CircleROITool);
        cornerstoneTools.addTool(BidirectionalTool);
        cornerstoneTools.addTool(AngleTool);
        cornerstoneTools.addTool(CobbAngleTool);
        cornerstoneTools.addTool(ArrowAnnotateTool);
        cornerstoneTools.addTool(PlanarFreehandROITool);
        cornerstoneTools.addTool(EraserTool);
        cornerstoneTools.addTool(StackScrollTool);


        // 툴 그룹 생성
        toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
        console.log(toolGroup);

        // 툴 적용
        toolGroup.addTool(StackScrollMouseWheelTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(LengthTool.toolName);
        toolGroup.addTool(HeightTool.toolName);
        toolGroup.addTool(ProbeTool.toolName);
        toolGroup.addTool(RectangleROITool.toolName);
        toolGroup.addTool(EllipticalROITool.toolName);
        toolGroup.addTool(CircleROITool.toolName);
        toolGroup.addTool(BidirectionalTool.toolName);
        toolGroup.addTool(AngleTool.toolName);
        toolGroup.addTool(CobbAngleTool.toolName);
        toolGroup.addTool(ArrowAnnotateTool.toolName);
        toolGroup.addTool(PlanarFreehandROITool.toolName);
        toolGroup.addTool(EraserTool.toolName);
        toolGroup.addTool(StackScrollTool.toolName);

        // 툴 활성화 (기본 도구 설정)
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName, {
            bindings: [{ mouseButton: MouseBindings.Auxiliary }],
        });

        toolGroup.setToolActive(StackScrollTool.toolName, {
            bindings: [{mouseButton: MouseBindings.Primary}],
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
            LengthTool.toolName,
            HeightTool.toolName,
            ProbeTool.toolName,
            RectangleROITool.toolName,
            EllipticalROITool.toolName,
            CircleROITool.toolName,
            BidirectionalTool.toolName,
            AngleTool.toolName,
            CobbAngleTool.toolName,
            ArrowAnnotateTool.toolName,
            PlanarFreehandROITool.toolName,
            EraserTool.toolName,
            StackScrollTool.toolName
        ];
        
        // 툴제거
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

const play = (selectedViewport) => {
    if(selectedViewport){
        utilities.cine.playClip(selectedViewport,{
            framesPerSecond: 24,
            loop: true
        })
    }
}

const stop = (selectedViewport) => {
    if(selectedViewport){
        utilities.cine.stopClip(selectedViewport);
    }
}

export { setTools, activateTool, play, stop };
