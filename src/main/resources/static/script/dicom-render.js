import * as cornerstone from '@cornerstonejs/core'; // cornerstone 모듈 임포트
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'; // cornerstone DICOM 이미지 로더 모듈 임포트
import * as dicomParser from 'dicom-parser'; // dicom 파서 모듈 임포트
import * as tools from './setTools.js';
import {
    AngleTool, ArrowAnnotateTool,
    BidirectionalTool,
    CircleROITool, CobbAngleTool,
    EllipticalROITool, EraserTool,
    HeightTool,
    LengthTool,
    PanTool, PlanarFreehandROITool,
    ProbeTool,
    RectangleROITool, StackScrollTool, utilities,
    WindowLevelTool,
    ZoomTool
} from "@cornerstonejs/tools";

let isValid = false;
const thumbnailBtn =  document.getElementById('thumbnail-btn');
const toggleBox = document.getElementById('toggle-box');
const thumbnailContainer = document.createElement('div');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.flexDirection = 'column';
thumbnailContainer.style.marginRight = '10px';
toggleBox.appendChild(thumbnailContainer);

const gridBtn = document.getElementById('grid-btn');
const gridContainer = document.getElementById('grid-container');
const gridItems = document.querySelectorAll('.grid-item');
const content = document.getElementById('content');

content.oncontextmenu = (e) => e.preventDefault();

const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];

let viewports = [];
const seriesImages = {};
let studyInfo = "";
let seriesList = [];
let selectedViewport = null; // 선택된 뷰포트를 추적하기 위한 변수

let renderingEngine;
let toolGroupId = `toolGroupId`; // 툴 그룹 ID 초기화

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
    renderingEngine = new cornerstone.RenderingEngine('myRenderingEngine');

    createGridInContent(1, 1);

    try {
        const seriesList = await fetchSeriesKeys();
        await fetchDataAndRender(seriesList);
        // 첫 번째 뷰포트를 선택 상태로 설정
        if (viewports.length > 0) {
            selectViewport(viewports[0]);
        }
    } catch (error) {
        console.error(error);
    }
};

gridBtn.addEventListener('click', toggleGrid);

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

        toggleGrid();
        fetchSeriesKeys().then(seriesList => {
            fetchDataAndRender(seriesList);
        }).catch(console.error);
    });
});

function toggleGrid() {
    gridContainer.style.display = gridContainer.style.display === 'none' || gridContainer.style.display === '' ? 'flex' : 'none';
}

function highlightCells(row, col) {
    gridItems.forEach(item => {
        const itemRow = parseInt(item.getAttribute('data-row'));
        const itemCol = parseInt(item.getAttribute('data-col'));

        item.classList.toggle('highlight', itemRow <= row && itemCol <= col);
    });
}

function clearHighlights() {
    gridItems.forEach(item => {
        item.classList.remove('highlight');
    });
}

function createGridInContent(maxRow, maxCol) {
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
            cell.className = 'viewport';
            cell.id = `viewport${cellId}`;
            cell.style.border = '1px solid #ccc';
            cell.style.width = '100%';
            cell.style.height = '100%';
            cell.style.background = 'black';
            cell.oncontextmenu = (e) => e.preventDefault();
            cell.ondrop = (e) => onDrop(e, cell);
            cell.ondragover = (e) => e.preventDefault();
            cell.addEventListener('click', () => selectViewport(cell)); // 클릭 이벤트 추가

            invertHandler(cell);

            viewports.push(cell);
            content.appendChild(cell);
            cellId++;
        }
    }
    // Apply tools to all viewports
    tools.setTools(viewports, renderingEngine.id, toolGroupId);
}

function selectViewport(cell) {
    if (selectedViewport) {
        console.log(selectedViewport);
        selectedViewport.style.border = '1px solid #ccc'; // 기존 선택된 뷰포트의 테두리 초기화
    }
    cell.style.border = '2px solid #5C88C4'; // 새로운 선택된 뷰포트에 파란색 테두리 적용
    selectedViewport = cell;
}

const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div');
    thumbnail.style.width = '200px'; // 썸네일 너비
    thumbnail.style.height = '200px'; // 썸네일 높이
    thumbnail.style.border = '1px solid black';
    thumbnail.style.margin = '5px';
    thumbnail.style.overflow = 'hidden'; // 썸네일 오버플로우 숨김
    thumbnail.style.display = 'flex';
    thumbnail.style.justifyContent = 'center';
    thumbnail.style.alignItems = 'center';
    thumbnail.draggable = true;
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey);
    return thumbnail;
};

const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey);
}

const onDrop = (e, element) => {
    e.preventDefault();
    const seriesKey = e.dataTransfer.getData('text/plain');
    const viewportId = `CT_AXIAL_STACK-${element.id}`;
    displaySeries(seriesKey, element, renderingEngine.id, viewportId); // displaySeries 호출
}

async function fetchSeriesKeys() {
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
        return [];
    }
}

async function fetchSeriesImages(seriesKey) {
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
        console.log(list);
        const files = list.fileList;

        files.forEach((base64, index) => {
            const binaryString = atob(base64);
            const arrayBuffer = Uint8Array.from(binaryString, c => c.charCodeAt(0));
            const blob = new Blob([arrayBuffer], { type: 'application/dicom' });
            const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(blob, `image-${seriesKey}-${index}`);
            imageIds.push(imageId);
        });

        seriesImages[seriesKey] = imageIds;
        console.log(`Image IDs for series ${seriesKey}:`, imageIds);
        return imageIds;

    } catch (e) {
        console.error("에러:", e);
        return [];
    }
}

async function fetchDataAndRender(seriesList) {
    const seriesPromises = seriesList.map(seriesKey => fetchSeriesImages(seriesKey));
    await Promise.all(seriesPromises);

    let validSeriesIndex = 0;
    for (let i = 0; i < viewports.length; i++) {
        while (validSeriesIndex < seriesList.length && (!seriesImages[seriesList[validSeriesIndex]] || seriesImages[seriesList[validSeriesIndex]].length === 0)) {
            validSeriesIndex++;
        }

        if (validSeriesIndex < seriesList.length) {
            const seriesKey = seriesList[validSeriesIndex];
            const renderingEngineId = `myRenderingEngine-${viewports[i].id}`;
            const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`;
            const imageIds = seriesImages[seriesKey];
            displaySeries(seriesKey, viewports[i], renderingEngineId, viewportId, imageIds);
            tools.setTools([viewports[i]], renderingEngine.id, toolGroupId); // 단일 요소 배열로 전달
            validSeriesIndex++;
        }
    }
}

const displaySeries = async (seriesKey, element, renderingEngineId, viewportId) => {
    element.className = 'parentDiv';
    const imageIds = await fetchSeriesImages(seriesKey); // fetchSeriesImages 함수를 사용하여 imageIds를 가져옴
    if (imageIds && imageIds.length !== 0) {
        try {
            render(imageIds, element, renderingEngineId, viewportId);
        } catch (e) {
            console.log(e);
        }
    }
}

const render = async (imageIds, element, renderingEngineId, viewportId) => {
    try {
        const viewportInput = {
            viewportId: viewportId,
            element: element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportInput.viewportId);

        viewport.setStack(imageIds, 0);

        viewport.render();

        tools.setTools([element], renderingEngine.id, toolGroupId); // 단일 요소 배열로 전달

    } catch (error) {
        console.error(`Rendering error for viewport ${viewportId}:`, error);
    }
};

const tRender = async (imageIds, element, renderingEngineId, viewportId) => {
    try {
        const viewportInput = {
            viewportId: viewportId,
            element: element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportInput.viewportId);

        viewport.setStack(imageIds, 0);

        viewport.render();

    } catch (error) {
        console.error(`Rendering error for viewport ${viewportId}:`, error);
    }
};

const renderThumbnailsInOrder = (seriesList) => {
    seriesList.forEach(seriesKey => {
        if (seriesImages[seriesKey] && seriesImages[seriesKey].length > 0) {
            const thumbnail = createThumbnailElement(seriesKey);
            thumbnailContainer.appendChild(thumbnail);

            const firstImageId = seriesImages[seriesKey][0];
            const thumbnailViewportId = `thumbnail-${seriesKey}`;
            const thumbnailElement = document.createElement('div');
            thumbnailElement.style.width = '100%'; // 썸네일 요소 너비
            thumbnailElement.style.height = '100%'; // 썸네일 요소 높이
            thumbnailElement.style.objectFit = 'contain'; // 이미지 비율 유지하면서 맞춤
            thumbnailElement.style.display = 'flex';
            thumbnailElement.style.justifyContent = 'center';
            thumbnailElement.style.alignItems = 'center';

            thumbnail.appendChild(thumbnailElement);

            tRender([firstImageId], thumbnailElement, 'thumbnailRenderingEngine', thumbnailViewportId);
        }
    });
};

// Check if the toggle box is open
const isToggleBoxOpen = () => {
    return toggleBox.style.display !== 'none';
};

// Re-render thumbnails if toggle box is opened after rendering all series
thumbnailBtn.addEventListener('click', () => {
    if (!isValid && thumbnailContainer.childElementCount === 0 && isToggleBoxOpen()) {
        renderThumbnailsInOrder(seriesList);
        isValid = true;
    }
});

init();

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
})

document.getElementById('Height-tool-btn').addEventListener('click', () => {
    tools.activateTool(HeightTool, toolGroupId);
})

document.getElementById('Probe-tool-btn').addEventListener('click', () => {
    tools.activateTool(ProbeTool, toolGroupId);
})

document.getElementById('RectangleROI-tool-btn').addEventListener('click', () =>{
    tools.activateTool(RectangleROITool, toolGroupId);
})

document.getElementById('EllipticalIROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(EllipticalROITool, toolGroupId);
})

document.getElementById('CircleROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(CircleROITool, toolGroupId);
})

document.getElementById('Bidirectional-tool-btn').addEventListener('click', () => {
    tools.activateTool(BidirectionalTool, toolGroupId);
})

document.getElementById('Angle-tool-btn').addEventListener('click', () => {
    tools.activateTool(AngleTool, toolGroupId);
})

document.getElementById('CobbAngle-tool-btn').addEventListener('click', ()=> {
    tools.activateTool(CobbAngleTool,toolGroupId);
})

document.getElementById('ArrowAnnotate-tool-btn').addEventListener('click', () => {
    tools.activateTool(ArrowAnnotateTool, toolGroupId);
})

document.getElementById('PlanarFreehandROI-tool-btn').addEventListener('click', () => {
    tools.activateTool(PlanarFreehandROITool, toolGroupId);
})

document.getElementById('Eraser-tool-btn').addEventListener('click' , () => {
    tools.activateTool(EraserTool, toolGroupId);
})

document.getElementById('StackScroll-tool-btn').addEventListener('click', () => {
    tools.activateTool(StackScrollTool, toolGroupId);
});

document.getElementById('Playclip-tool-btn').addEventListener('click', () => {
    tools.play(selectedViewport); // 스피드 조절 가능
})

document.getElementById('StopPlayclip-tool-btn').addEventListener('click', () =>{
    tools.stop(selectedViewport);
})

const invertButton = document.getElementById('Invert-tool-btn');
let invertCheck;

function invertImageWithWWWC(viewportElement) {
    const viewportId = `CT_AXIAL_STACK-${viewportElement.id}`;
    console.log(`Attempting to get viewport with ID: ${viewportId}`);
    const viewport = renderingEngine.getViewport(viewportId);

    if (viewport) {
        const properties = viewport.getProperties();
        console.log(`Current invert status: ${properties.invert}`);

        // Toggle the invert status
        properties.invert = invertCheck;
        viewport.setProperties(properties);

        console.log(`New invert status: ${properties.invert}`);
        viewport.render();
    } else {
        console.error(`Viewport with ID ${viewportId} not found.`);
    }
}

invertButton.addEventListener('click', () => {
    console.log('Invert button clicked');
    if (selectedViewport) {
        const viewportElement = selectedViewport;
        console.log(`Selected viewport ID: ${viewportElement.id}`);

        if (viewportElement.getAttribute('invert') === 'unchecked') {
            viewportElement.setAttribute('invert', 'checked');
            invertCheck = true;
        } else {
            viewportElement.setAttribute('invert', 'unchecked');
            invertCheck = false;
        }
        console.log(`Invert check status: ${invertCheck}`);
        invertImageWithWWWC(viewportElement);
    } else {
        console.error("No viewport selected.");
    }
});

function invertHandler(viewportElement) {
    const invertVal = viewportElement.getAttribute('invert');
    if (invertVal === null) {
        viewportElement.setAttribute('invert', 'unchecked');
    }
}

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

function enableScrollLoop(viewportElement) {
    viewportElement.addEventListener('wheel', handleScrollLoop);
}

function disableScrollLoop(viewportElement) {
    viewportElement.removeEventListener('wheel', handleScrollLoop);
}

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
        console.log('index', newIndex);
        console.log('max', totalImages);

        viewport.setStack(imageIds, newIndex);
        viewport.render();
    } else {
        console.error(`Viewport with ID ${viewportId} not found.`);
    }
}