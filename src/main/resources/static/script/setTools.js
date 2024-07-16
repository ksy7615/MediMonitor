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
    utilities, MagnifyTool, PlanarRotateTool, annotation
} from "@cornerstonejs/tools";
import * as cornerstoneTools from "@cornerstonejs/tools";
const { ToolGroupManager } = cornerstoneTools;
const { MouseBindings } = cornerstoneTools.Enums;

let toolGroup;

const setTools = (viewports, renderingEngineId, toolGroupId) => {

    csToolsInit();

    if (!toolGroup) {

        toolGroupId = `toolGroupId`;

        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(PanTool);
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
        cornerstoneTools.addTool(MagnifyTool);
        cornerstoneTools.addTool(PlanarRotateTool);

        toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

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
        toolGroup.addTool(MagnifyTool.toolName);
        toolGroup.addTool(PlanarRotateTool.toolName);

        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName, {
            bindings: [{ mouseButton: MouseBindings.Auxiliary }],
        });

        toolGroup.setToolActive(StackScrollTool.toolName, {
            bindings: [{mouseButton: MouseBindings.Primary}],
        });
    }

    viewports.forEach(viewport => {
        const viewportId = `CT_AXIAL_STACK-${viewport.id}`;
        toolGroup.addViewport(viewportId, renderingEngineId);
    });
}

const activateTool = (toolName, toolGroupId) => {
    const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
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
            StackScrollTool.toolName,
            MagnifyTool.toolName,
            PlanarRotateTool.toolName
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

const play = (selectedViewport , fpsValue) => {
    if(selectedViewport){
        utilities.cine.playClip(selectedViewport,{
            framesPerSecond: fpsValue,
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
