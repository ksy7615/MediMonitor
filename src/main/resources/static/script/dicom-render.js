import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from './setTools.js';
import {
    AngleTool, ArrowAnnotateTool, BidirectionalTool, CircleROITool, CobbAngleTool,
    EllipticalROITool, EraserTool, HeightTool, LengthTool, MagnifyTool, PanTool,
    PlanarFreehandROITool, PlanarRotateTool, ProbeTool, RectangleROITool, StackScrollTool,
    WindowLevelTool, ZoomTool
} from "@cornerstonejs/tools";

let isValid = false;
const thumbnailBtn = document.getElementById('thumbnail-btn');
const toggleBox = document.getElementById('toggle-box');
const thumbnailContainer = document.createElement('div');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.flexDirection = 'column';
thumbnailContainer.style.marginRight = '10px';
thumbnailContainer.style.justifyContent = 'center';
thumbnailContainer.style.alignItems = 'center';
thumbnailContainer.style.margin = 'auto';
toggleBox.appendChild(thumbnailContainer);

const gridBtn = document.getElementById('grid-btn');
const gridContainer = document.getElementById('grid-container');
const gridItems = document.querySelectorAll('.grid-item');
const content = document.getElementById('content');

content.oncontextmenu = (e) => e.preventDefault();

const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];
const studyDate = pathParts[3];

let viewports = [];
const seriesImages = {};
let studyInfo = "";
let seriesList = [];
let selectedViewport = null;
let thumbnailCnt = 0;
let viewportSeriesMap = {};
let renderingEngine;
let toolGroupId = 'toolGroupId';
let metadata = {};

let previousGridSize = {rows: 1, cols: 1};
let isDblClick = false;

const init = async () => {
    await cornerstone.init();

    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;

    const config = {
        maxWebWorkers: navigator.hardwareConcurrency || 1,
        startWebWorkersOnDemand: true,
        taskConfiguration: {
            decodeTask: { initializeCodecsOnStartup: false },
            sleepTask: { sleepTime: 3000 },
        },
    };

    cornerstoneDICOMImageLoader.webWorkerManager.initialize(config);
    renderingEngine = new cornerstone.RenderingEngine('myRenderingEngine');

    createGridInContent(1, 1);

    try {
        const seriesList = await fetchSeriesKeys();
        await fetchDataAndRender(seriesList);
        if (viewports.length > 0) {
            selectViewport(viewports[0]);
        }
    } catch (error) {
        console.error(error);
    }
};

const toggleGrid = () => {
    gridContainer.style.display = gridContainer.style.display === 'none' || gridContainer.style.display === '' ? 'flex' : 'none';
};

const highlightCells = (row, col) => {
    gridItems.forEach(item => {
        const itemRow = parseInt(item.getAttribute('data-row'));
        const itemCol = parseInt(item.getAttribute('data-col'));
        item.classList.toggle('highlight', itemRow <= row && itemCol <= col);
    });
};

const clearHighlights = () => {
    gridItems.forEach(item => item.classList.remove('highlight'));
};

gridItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const row = parseInt(item.getAttribute('data-row'));
        const col = parseInt(item.getAttribute('data-col'));
        highlightCells(row, col);
    });

    item.addEventListener('mouseleave', () => {
        clearHighlights();
    });

    item.addEventListener('click', () => {
        const row = parseInt(item.getAttribute('data-row'));
        const col = parseInt(item.getAttribute('data-col'));
        createGridInContent(row, col);

        previousGridSize = {rows: row, cols: col};

        toggleGrid();
        fetchSeriesKeys().then(seriesList => {
            fetchDataAndRender(seriesList);
        }).catch(console.error);
    });
});


const createGridInContent = (maxRow, maxCol) => {
    content.innerHTML = '';

    const totalRows = maxRow + 1;
    const totalCols = maxCol + 1;

    content.style.display = 'grid';
    content.style.gridTemplateColumns = `repeat(${totalCols}, 1fr)`;
    content.style.gridTemplateRows = `repeat(${totalRows}, 1fr)`;
    viewports = [];
    let cellId = 1;

    for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
            const cell = document.createElement('div');
            cell.className = 'viewport parentDiv';
            cell.id = `viewport${cellId}`;
            cell.style.position = 'relative';
            cell.style.border = '1px solid #ccc';
            cell.style.width = '100%';
            cell.style.height = '100%';
            cell.style.background = 'black';
            cell.oncontextmenu = (e) => e.preventDefault();
            cell.ondrop = (e) => onDrop(e, cell);
            cell.ondragover = (e) => e.preventDefault();
            cell.addEventListener('click', () => selectViewport(cell));

            invertHandler(cell);
            cell.addEventListener('dblclick', () => toggleGridSize(cell));

            viewports.push(cell);
            content.appendChild(cell);
            cellId++;
        }
    }

    tools.setTools(viewports, renderingEngine.id, toolGroupId);
};

const toggleGridSize = (cell) => {
    if (thumbnailCnt > 0) {
        createGridInContent(previousGridSize.rows, previousGridSize.cols);
        Object.keys(viewportSeriesMap).forEach(viewportId => {
            const seriesKey = viewportSeriesMap[viewportId];
            const element = document.getElementById(viewportId);
            const viewport = renderingEngine.getViewport(`CT_AXIAL_STACK-${viewportId}`);

            if (viewport) {
                const currentIndex = viewport.getCurrentImageIdIndex();
                eDisplaySeries(seriesKey, element, renderingEngine.id, `CT_AXIAL_STACK-${element.id}`, currentIndex);
            }
        });

        thumbnailCnt = 0;
    } else {
        if (!isDblClick) {
            if (selectedViewport) {
                content.innerHTML = '';
                selectedViewport.style.gridRow = '1 / -1';
                selectedViewport.style.gridColumn = '1 / -1';
                selectedViewport.style.width = '100%';
                selectedViewport.style.height = '100%';
                content.appendChild(selectedViewport);
                isDblClick = true;

                Object.keys(viewportSeriesMap).forEach(viewportId => {
                    if (viewportId === selectedViewport.id) {
                        const seriesKey = viewportSeriesMap[viewportId];
                        const viewport = renderingEngine.getViewport(`CT_AXIAL_STACK-${viewportId}`);

                        if (viewport) {
                            const currentIndex = viewport.getCurrentImageIdIndex();
                            eDisplaySeries(seriesKey, selectedViewport, renderingEngine.id, `CT_AXIAL_STACK-${selectedViewport.id}`, currentIndex);
                        }
                    }
                });
            }
        } else {
            createGridInContent(previousGridSize.rows, previousGridSize.cols);
            Object.keys(viewportSeriesMap).forEach(viewportId => {
                const seriesKey = viewportSeriesMap[viewportId];
                const element = document.getElementById(viewportId);
                const viewport = renderingEngine.getViewport(`CT_AXIAL_STACK-${viewportId}`);

                if (viewport) {
                    const currentIndex = viewport.getCurrentImageIdIndex();
                    eDisplaySeries(seriesKey, element, renderingEngine.id, `CT_AXIAL_STACK-${element.id}`, currentIndex);
                }
            });
            isDblClick = false;
        }
    }
};

const selectViewport = (cell) => {
    if (selectedViewport) {
        selectedViewport.style.border = '1px solid #ccc';
    }
    cell.style.border = '2px solid #5C88C4';
    selectedViewport = cell;
};

const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div');
    thumbnail.style.width = '200px';
    thumbnail.style.height = '200px';
    thumbnail.style.border = '1px solid black';
    thumbnail.style.margin = '5px';
    thumbnail.style.overflow = 'hidden';
    thumbnail.style.display = 'flex';
    thumbnail.style.justifyContent = 'center';
    thumbnail.style.alignItems = 'center';
    thumbnail.draggable = true;
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey);

    thumbnail.addEventListener('click', () => {
        thumbnailCnt++;
        displayThumbnailnGrid(seriesKey).then(() => {
            selectViewport(viewports[0]);
        });
    });

    return thumbnail;
};

const displayThumbnailnGrid = async (seriesKey) => {
    createGridInContent(0, 0);
    if (viewports.length > 0) {
        const element = viewports[0];
        const viewportId = `CT_AXIAL_STACK-${element.id}`;
        await displaySeries(seriesKey, element, renderingEngine.id, viewportId);
    }
};

const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey);
};

const onDrop = (e, element) => {
    e.preventDefault();
    const seriesKey = e.dataTransfer.getData('text/plain');
    const viewportId = `CT_AXIAL_STACK-${element.id}`;
    displaySeries(seriesKey, element, renderingEngine.id, viewportId);
    viewportSeriesMap[element.id] = seriesKey;
};

const fetchSeriesKeys = async () => {
    const seriesEndpoint = `/api/detail/${studyKey}`;

    try {
        const response = await fetch(seriesEndpoint, { method: 'GET' });
        const series = await response.json();

        studyInfo = series.study;
        seriesList = series.seriesList;

        return series.seriesList;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const fetchSeriesImages = async (seriesKey) => {
    if (seriesImages[seriesKey]) {
        return seriesImages[seriesKey];
    }

    const imageEndpoint = `/api/image/${studyKey}/${seriesKey}`;
    let imageIds = [];

    try {
        const response = await fetch(imageEndpoint, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const list = await response.json();
        const files = list.fileList;

        files.forEach((base64) => {
            const binaryString = atob(base64);
            const arrayBuffer = Uint8Array.from(binaryString, c => c.charCodeAt(0));
            const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], { type: 'application/dicom' }))}`;
            setMetadata(arrayBuffer, imageId);
            imageIds.push(imageId);
        });

        seriesImages[seriesKey] = imageIds;
        return imageIds;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const fetchDataAndRender = async (seriesList) => {
    const seriesPromises = seriesList.map(seriesKey => fetchSeriesImages(seriesKey));
    await Promise.all(seriesPromises);

    let validSeriesIndex = 0;
    for (let i = 0; i < viewports.length; i++) {
        while (validSeriesIndex < seriesList.length && (!seriesImages[seriesList[validSeriesIndex]] || seriesImages[seriesList[validSeriesIndex]].length === 0)) {
            validSeriesIndex++;
        }

        if (validSeriesIndex < seriesList.length) {
            const seriesKey = seriesList[validSeriesIndex];
            const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`;
            displaySeries(seriesKey, viewports[i], renderingEngine.id, viewportId, true);
            tools.setTools([viewports[i]], renderingEngine.id, toolGroupId);
            viewportSeriesMap[viewports[i].id] = seriesKey;
            validSeriesIndex++;
        }
    }
};

const displaySeries = async (seriesKey, element, renderingEngineId, viewportId, addMetadata = true) => {
    element.className = 'parentDiv';
    const imageIds = await fetchSeriesImages(seriesKey);

    if (imageIds && imageIds.length !== 0) {
        try {
            render(imageIds, element, renderingEngineId, viewportId);
            if (addMetadata) {
                const meta = metadata[imageIds[0]];
                updateMetadataDisplay(element, meta);
            }
        } catch (e) {
            console.error(e);
        }
    }
};

const setMetadata = (arrayBuffer, imageId) => {
    const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
    const dataSet = dicomParser.parseDicom(arrayBuffer, options);

    metadata[imageId] = {
        patientName: studyInfo.pname,
        pbirthdatetime: studyInfo.pbirthdatetime,
        patientSex: studyInfo.psex,
        pid: studyInfo.pid,
        studydate: studyInfo.studydate,
        studydesc: studyInfo.studydesc,
        modality: studyInfo.modality,
        instancenum: dataSet.string('x00200013') || 'N/A',
        contentTime: dataSet.string('x00080033') || 'N/A',
        windowCenter: dataSet.string('x00281050') || 'N/A',
        windowWidth : dataSet.string('x00281051') || 'N/A',
        institution : dataSet.string('x00080080') || 'N/A',
        manufacturerModel : dataSet.string('x00081090') || 'N/A'
    };
};


const eDisplaySeries = async (seriesKey, element, renderingEngineId, viewportId, currentIndex) => {
    element.className = 'parentDiv';
    const imageIds = await fetchSeriesImages(seriesKey);

    if (imageIds && imageIds.length !== 0) {
        try {
            render(imageIds, element, renderingEngineId, viewportId, currentIndex);
        } catch (e) {
            console.error(e);
        }
    }
};

const startMetadataUpdater = (viewport, element) => {
    let lastImageId = null;

    const updateMetadata = () => {
        const imageId = viewport.getImageIds()[viewport.getCurrentImageIdIndex()];

        if (imageId !== lastImageId) {
            lastImageId = imageId;
            const meta = metadata[imageId];
            updateMetadataDisplay(element, meta);
        }

        requestAnimationFrame(updateMetadata);
    };

    updateMetadata();
};

const render = async (imageIds, element, renderingEngineId, viewportId, currentIndex = 0, displayMetadata = true) => {
    try {
        const viewportInput = {
            viewportId: viewportId,
            element: element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportInput.viewportId);

        if (!viewport) {
            return;
        }

        viewport.setStack(imageIds, currentIndex);
        viewport.render();

        if (displayMetadata) {
            startMetadataUpdater(viewport, element);
        }

        tools.setTools([element], renderingEngine.id, toolGroupId);
    } catch (error) {
        console.error(error);
    }
};

const updateMetadataDisplay = (element, meta) => {

    let metadataDiv = element.querySelector('.metadata');
    if (!metadataDiv) {
        metadataDiv = document.createElement('div');
        metadataDiv.className = 'metadata';
        metadataDiv.style.position = 'absolute';
        metadataDiv.style.zIndex = '10';
        metadataDiv.style.color = 'white';
        metadataDiv.style.top = '10px';
        metadataDiv.style.left = '10px';
        element.appendChild(metadataDiv);
    }
    metadataDiv.innerText = `${meta.patientName}\n${meta.patientSex}\n${meta.pid}\n${meta.pbirthdatetime}\n${meta.studydesc}\n${meta.studydate}\n${meta.instancenum}\n${meta.contentTime}`;

    let metadataDivTopRight = element.querySelector('.metadata-top-right');
    if (!metadataDivTopRight) {
        metadataDivTopRight = document.createElement('div');
        metadataDivTopRight.className = 'metadata-top-right';
        metadataDivTopRight.style.position = 'absolute';
        metadataDivTopRight.style.zIndex = '10';
        metadataDivTopRight.style.color = 'white';
        metadataDivTopRight.style.top = '10px';
        metadataDivTopRight.style.right = '10px';
        element.appendChild(metadataDivTopRight);
    }
    metadataDivTopRight.innerText = `${meta.institution}\n${meta.modality}\n${meta.manufacturerModel}`;

    let metadataDivBottomRight = element.querySelector('.metadata-bottom-right');
    if (!metadataDivBottomRight) {
        metadataDivBottomRight = document.createElement('div');
        metadataDivBottomRight.className = 'metadata-bottom-right';
        metadataDivBottomRight.style.position = 'absolute';
        metadataDivBottomRight.style.zIndex = '10';
        metadataDivBottomRight.style.color = 'white';
        metadataDivBottomRight.style.bottom = '10px';
        metadataDivBottomRight.style.right = '10px';
        element.appendChild(metadataDivBottomRight);
    }
    metadataDivBottomRight.innerText = `${meta.windowCenter}\n${meta.windowWidth}`;
};

const renderThumbnailsInOrder = (seriesList) => {
    seriesList.forEach(seriesKey => {
        if (seriesImages[seriesKey] && seriesImages[seriesKey].length > 0) {
            const thumbnail = createThumbnailElement(seriesKey);
            thumbnailContainer.appendChild(thumbnail);

            const firstImageId = seriesImages[seriesKey][0];
            const thumbnailViewportId = `thumbnail-${seriesKey}`;
            const thumbnailElement = document.createElement('div');
            thumbnailElement.style.width = '100%';
            thumbnailElement.style.height = '100%';
            thumbnailElement.style.objectFit = 'contain';
            thumbnailElement.style.display = 'flex';
            thumbnailElement.style.justifyContent = 'center';
            thumbnailElement.style.alignItems = 'center';

            thumbnail.appendChild(thumbnailElement);
            render([firstImageId], thumbnailElement, 'thumbnailRenderingEngine', thumbnailViewportId, 0, false);
        }
    });
};

const isToggleBoxOpen = () => {
    return toggleBox.style.display !== 'none';
};

thumbnailBtn.addEventListener('click', () => {
    if (!isValid && thumbnailContainer.childElementCount === 0 && isToggleBoxOpen()) {
        renderThumbnailsInOrder(seriesList);
        isValid = true;
    }
});

init();

document.addEventListener('DOMContentLoaded', function () {
    const annotationBtn = document.getElementById('annotationBtn');
    const annotationGroup = document.getElementById('annotation-group');
    const annotationButtons = annotationGroup.querySelectorAll('.tools');

    const toolGroupBtn = document.getElementById('toolGroupBtn');
    const toolGroup = document.getElementById('tools-group');
    const toolButtons = toolGroup.querySelectorAll('.tools');

    annotationBtn.addEventListener('click', function () {
        if (annotationGroup.style.display === 'none' || annotationGroup.style.display === '') {
            annotationGroup.style.display = 'flex';
            const rect = annotationBtn.getBoundingClientRect();
            annotationGroup.style.top = `${rect.bottom}px`;
            annotationGroup.style.left = `${rect.left}px`;

            if(toolGroup.style.display === 'flex') {
                toolGroup.style.display = 'none';
            }
        } else {
            annotationGroup.style.display = 'none';
        }
    });

    toolGroupBtn.addEventListener('click', function () {
        if (toolGroup.style.display === 'none' || toolGroup.style.display === '') {
            toolGroup.style.display = 'flex';
            const rect = toolGroupBtn.getBoundingClientRect();
            toolGroup.style.top = `${rect.bottom}px`;
            toolGroup.style.left = `${rect.left}px`;

            if(annotationGroup.style.display === 'flex') {
                annotationGroup.style.display = 'none';
            }

        } else {
            toolGroup.style.display = 'none';
        }
    });

    gridBtn.addEventListener('click', function () {
        if (gridContainer.style.display === 'none' || gridContainer.style.display === '') {
            gridContainer.style.display = 'flex';
            const rect = gridBtn.getBoundingClientRect();
            gridContainer.style.top = `${rect.bottom + 80}px`;
            gridContainer.style.left = `${rect.left + 80}px`;
        } else {
            gridContainer.style.display = 'none';
        }
    });

    annotationButtons.forEach(button => {
        button.addEventListener('click', () => annotationGroup.style.display = 'none');
    });

    toolButtons.forEach(button => {
        button.addEventListener('click', () => toolGroup.style.display = 'none');
    });
});

document.getElementById('Zoom-tool-btn').addEventListener('click', () => {
    tools.activateTool(ZoomTool, toolGroupId);
});

document.getElementById('Window-level-tool-btn').addEventListener('click', () => {
    tools.activateTool(WindowLevelTool, toolGroupId);
});

document.getElementById('Pan-tool-btn').addEventListener('click', () => {
    tools.activateTool(PanTool, toolGroupId);
});

document.getElementById('Length-tool-btn').addEventListener('click', () => {
    tools.activateTool(LengthTool, toolGroupId);
});

document.getElementById('Height-tool-btn').addEventListener('click', () => {
    tools.activateTool(HeightTool, toolGroupId);
});

document.getElementById('Probe-tool-btn').addEventListener('click', () => {
    tools.activateTool(ProbeTool, toolGroupId);
});

document.getElementById('RectangleROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(RectangleROITool, toolGroupId);
});

document.getElementById('EllipticalIROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(EllipticalROITool, toolGroupId);
});

document.getElementById('CircleROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(CircleROITool, toolGroupId);
});

document.getElementById('Bidirectional-tool-btn').addEventListener('click', () => {
    tools.activateTool(BidirectionalTool, toolGroupId);
});

document.getElementById('Angle-tool-btn').addEventListener('click', () => {
    tools.activateTool(AngleTool, toolGroupId);
});

document.getElementById('CobbAngle-tool-btn').addEventListener('click', () => {
    tools.activateTool(CobbAngleTool, toolGroupId);
});

document.getElementById('ArrowAnnotate-tool-btn').addEventListener('click', () => {
    tools.activateTool(ArrowAnnotateTool, toolGroupId);
});

document.getElementById('PlanarFreehandROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(PlanarFreehandROITool, toolGroupId);
});

document.getElementById('Eraser-tool-btn').addEventListener('click', () => {
    tools.activateTool(EraserTool, toolGroupId);
});

document.getElementById('StackScroll-tool-btn').addEventListener('click', () => {
    tools.activateTool(StackScrollTool, toolGroupId);
});

document.getElementById('Playclip-tool-btn').addEventListener('click', () => {
    const fpsSliderContainer = document.getElementById('fps-slider-container');
    fpsSliderContainer.style.display = fpsSliderContainer.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('StartPlayclip-tool-btn').addEventListener('click', () => {
    const fps = document.getElementById('fps-slider').value;
    tools.play(selectedViewport, fps);
});

document.getElementById('fps-slider').addEventListener('input', (event) => {
    document.getElementById('fps-value').innerText = event.target.value;
});

document.getElementById('StopPlayclip-tool-btn').addEventListener('click', () => {
    tools.stop(selectedViewport);
});

const invertButton = document.getElementById('Invert-tool-btn');
let invertCheck;

const invertImageWithWWWC = (viewportElement) => {
    const viewportId = `CT_AXIAL_STACK-${viewportElement.id}`;
    const viewport = renderingEngine.getViewport(viewportId);

    if (viewport) {
        const properties = viewport.getProperties();
        properties.invert = invertCheck;
        viewport.setProperties(properties);
        viewport.render();
    }
};

invertButton.addEventListener('click', () => {
    if (selectedViewport) {
        const viewportElement = selectedViewport;

        if (viewportElement.getAttribute('invert') === 'unchecked') {
            viewportElement.setAttribute('invert', 'checked');
            invertCheck = true;
        } else {
            viewportElement.setAttribute('invert', 'unchecked');
            invertCheck = false;
        }
        invertImageWithWWWC(viewportElement);
    }
});

const invertHandler = (viewportElement) => {
    const invertVal = viewportElement.getAttribute('invert');
    if (invertVal === null) {
        viewportElement.setAttribute('invert', 'unchecked');
    }
};

let scrollLoopEnabled = false;

document.getElementById('scroll-loop-btn').addEventListener('click', () => {
    if (selectedViewport) {
        scrollLoopEnabled = !scrollLoopEnabled;
        if (scrollLoopEnabled) {
            enableScrollLoop(selectedViewport);
        } else {
            disableScrollLoop(selectedViewport);
        }
    }
});

const enableScrollLoop = (viewportElement) => {
    viewportElement.addEventListener('wheel', handleScrollLoop);
};

const disableScrollLoop = (viewportElement) => {
    viewportElement.removeEventListener('wheel', handleScrollLoop);
};


function handleScrollLoop(event) {
    event.preventDefault();

    const viewportId = `CT_AXIAL_STACK-${event.currentTarget.id}`;
    const viewport = renderingEngine.getViewport(viewportId);

    if (viewport) {
        const imageIds = viewport.getImageIds();
        const currentIndex = viewport.getCurrentImageIdIndex();
        const totalImages = imageIds.length;

        let newIndex = currentIndex;

        if (newIndex >= totalImages - 1) {
            newIndex = 0;
        } else if (newIndex <= 0) {
            newIndex = totalImages - 1;
        }

        viewport.setStack(imageIds, newIndex);
        viewport.render();
    }
}

document.getElementById('Magnify-tool-btn').addEventListener('click', () => {
    tools.activateTool(MagnifyTool, toolGroupId);
});

document.getElementById('Rotate-tool-btn').addEventListener('click', () => {
    tools.activateTool(PlanarRotateTool, toolGroupId);
});

document.getElementById('RigthRotate-tool-btn').addEventListener('click', () => {
    rotateViewport(selectedViewport, 60);
});

document.getElementById('LeftRotate-tool-btn').addEventListener('click', () => {
    rotateViewport(selectedViewport, -60);
});

const rotateViewport = (viewportElement, degrees) => {
    if (viewportElement) {
        const viewportId = `CT_AXIAL_STACK-${viewportElement.id}`;
        const viewport = renderingEngine.getViewport(viewportId);

        if (viewport) {
            const properties = viewport.getProperties();
            const newRotation = (properties.rotation || 0) + degrees;

            viewport.setProperties({ rotation: newRotation });
            viewport.render();
        }
    }
};

document.getElementById('WidthFlip-tool-btn').addEventListener('click' , () => {
    if(selectedViewport){
        const viewportId = `CT_AXIAL_STACK-${selectedViewport.id}`;
        const viewport = renderingEngine.getViewport(viewportId);

        if(viewport){
            const camera = viewport.getCamera();
            const { flipVertical } = camera;
            viewport.setCamera({ flipVertical : !flipVertical });

            viewport.render();
        }
    }
});

document.getElementById('HeghtFlip-tool-btn').addEventListener('click' , () => {
    if(selectedViewport){
        const viewportId = `CT_AXIAL_STACK-${selectedViewport.id}`;
        const viewport = renderingEngine.getViewport(viewportId);

        if(viewport){
            const camera = viewport.getCamera();
            const { flipHorizontal } = camera;
            viewport.setCamera({ flipHorizontal : !flipHorizontal });

            viewport.render();
        }
    }
});

document.getElementById('Reset-tool-btn').addEventListener('click', () => {
    if (selectedViewport) {
        const viewportId = `CT_AXIAL_STACK-${selectedViewport.id}`;
        const viewport = renderingEngine.getViewport(viewportId);

        if (viewport) {
            viewport.resetCamera();
            const imageIds = viewport.getImageIds();
            viewport.setStack(imageIds, 0);
            viewport.render();
        }
    }
});

document.getElementById('WorkList-tool-btn').addEventListener('click', () => {
    window.location.href = '/main';
});

const navigateStudy = async (endpoint) => {
    const response = await fetch(endpoint, { method: 'POST' });
    const data = await response.json();

    if (response.ok) {
        if (data && data.studyKey && data.studyDate) {
            window.location.href = `/detail/${encodeURIComponent(data.studyKey)}/${encodeURIComponent(data.studyDate)}`;
        } else if (data && data.message) {
            alert(data.message);
        }
    } else {
        alert('서버에 문제가 발생했습니다.');
    }
};

document.getElementById('Previous-tool-btn').addEventListener('click', () => {
    navigateStudy(`/api/study/previousDate/${studyDate}/${studyKey}`);
});

document.getElementById('Next-tool-btn').addEventListener('click', () => {
    navigateStudy(`/api/study/nextDate/${studyDate}/${studyKey}`);
});
