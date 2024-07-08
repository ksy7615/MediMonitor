import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from '../setTools.js';

// 문서가 모두 로드된 후 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
    const gridBtn = document.getElementById('grid-btn');
    const gridContainer = document.getElementById('grid-container');
    const gridItems = document.querySelectorAll('.grid-item');
    const content = document.getElementById('content');

    const paths = window.location.pathname;
    const pathParts = paths.split('/');
    const studyKey = pathParts[2];

    let viewports = [];
    const seriesImages = {};

    const init = async () => {
        await cornerstone.init(); // cornerstone 초기화

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

        cornerstoneDICOMImageLoader.webWorkerManager.initialize(config); // web worker 초기화
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
                viewports.push(cell);
                content.appendChild(cell);
                cellId++;
            }
        }
    }

    async function fetchSeriesKeys() {
        const seriesEndpoint = `/api/detail/${studyKey}`;

        try {
            const response = await fetch(seriesEndpoint, { method: 'GET' });
            const series = await response.json();

            console.log("series:", series);
            return series.seriesList;
        } catch (e) {
            console.log("에러 출력:", e);
            return [];
        }
    }

    async function fetchSeriesImages(seriesKey) {
        const imageEndpoint = `/api/image/${studyKey}/${seriesKey}`;

        let imageIds = [];
        try {
            const response = await fetch(imageEndpoint, { method: 'POST' });
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
            return imageIds;

        } catch (e) {
            console.log("에러:", e);
            return [];
        }
    }

    async function fetchDataAndRender(seriesList) {
        if (!Array.isArray(seriesList)) {
            console.log(seriesList);
            console.error('seriesList는 배열이어야 합니다.');
            return;
        }

        const gridItems = document.querySelectorAll('.viewport');
        // gridItems.forEach((element) => {
        //     viewports.push(element);
        // });
        for (let i = 0; i < seriesList.length && i < viewports.length ; i++) {
            const renderingEngineId = `myRenderingEngine-${viewports[i].id}`;
            const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`;
            const imageIds = await fetchSeriesImages(seriesList[i]);
            displaySeries(seriesList[i], viewports[i], renderingEngineId, viewportId, imageIds);
        }
    }

    const displaySeries = (seriesKey, element, renderingEngineId, viewportId, imageIds) => {
        element.className = 'parentDiv'; // 시리즈가 로드된 뷰포트 스타일 적용
        if (imageIds && imageIds.length !== 0) {
            try {
                tools.setTools(viewportId, renderingEngineId);
            } catch (e) {
                console.log(e);
            }
        }
        render(imageIds, element, renderingEngineId, viewportId);
    }

    const render = async (imageIds, element, renderingEngineId, viewportId) => {
        console.log('rendering imageIds:', imageIds); // 디버깅을 위해 추가

        // Rendering Engine 및 Viewport 설정
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

        const viewportInput = {
            viewportId: viewportId,
            element: element,
            type: cornerstone.Enums.ViewportType.STACK,
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportInput.viewportId);

        // 스택 설정
        viewport.setStack(imageIds, 0);

        // Viewport 렌더링
        viewport.render();
    }

    init().catch(console.error);
});
