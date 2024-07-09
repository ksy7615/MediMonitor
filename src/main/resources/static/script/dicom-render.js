import * as cornerstone from '@cornerstonejs/core'; // cornerstone 모듈 임포트
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'; // cornerstone DICOM 이미지 로더 모듈 임포트
import * as dicomParser from 'dicom-parser'; // dicom 파서 모듈 임포트
import * as tools from './setTools.js'; // 사용자 정의 도구 모듈 임포트


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

let renderingEngine;
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
        renderThumbnailsInOrder(seriesList);
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
            cell.oncontextmenu = (e) => e.preventDefault();
            cell.ondrop = (e) => onDrop(e, cell);
            cell.ondragover = (e) => e.preventDefault();
            viewports.push(cell);
            content.appendChild(cell);
            cellId++;
        }
    }
    // Apply tools to the first viewport
    if (viewports.length > 0) {
        tools.setTools(`CT_AXIAL_STACK-${viewports[0].id}`, renderingEngine.id);
    }
}

const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div');
    thumbnail.style.width = '100px';
    thumbnail.style.height = '100px';
    thumbnail.style.border = '1px solid black';
    thumbnail.style.margin = '5px';
    thumbnail.draggable = true;
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey);
    thumbnail.innerText = seriesKey;
    return thumbnail;
}

const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey);
}

const onDrop = (e, element) => {
    e.preventDefault();
    const seriesKey = e.dataTransfer.getData('text/plain');
    const viewportId = `CT_AXIAL_STACK-${element.id}`;
    const imageIds = seriesImages[seriesKey];
    if (imageIds) {
        displaySeries(seriesKey, element, renderingEngine.id, viewportId, imageIds);
        tools.setTools(viewportId, renderingEngine.id);
    } else {
        console.error(`No images found for seriesKey: ${seriesKey}`);
    }
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
            tools.setTools(viewportId, renderingEngine.id);
            validSeriesIndex++;
        }
    }
}

const displaySeries = (seriesKey, element, renderingEngineId, viewportId, imageIds) => {
    element.className = 'parentDiv';
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

        tools.setTools(viewportId, renderingEngine.id);

    } catch (error) {
        console.error(`Rendering error for viewport ${viewportId}:`, error);
    }
};

const renderThumbnailsInOrder = (seriesList) => {
    seriesList.forEach(seriesKey => {
        if (seriesImages[seriesKey] && seriesImages[seriesKey].length > 0) {
            const thumbnail = createThumbnailElement(seriesKey);
            thumbnailContainer.appendChild(thumbnail);
        }
    });
};

init();
