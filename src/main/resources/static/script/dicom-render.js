import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import * as dicomParser from 'dicom-parser';
import * as tools from './setTools.js';

const content = document.getElementById('content');
const element = document.createElement('div');

// 우클릭 방지
element.oncontextmenu = (e) => e.preventDefault();
element.style.width = '500px';
element.style.height = '500px';
content.appendChild(element);

// URL에서 studyKey 추출
const paths = window.location.pathname;
const pathParts = paths.split('/');
const studyKey = pathParts[2];

// Cornerstone 초기화
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

// 시리즈 키 가져오기 함수
const fetchSeriesKeys = async () => {
    const endpoint = `/api/detail/${studyKey}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET"
        });
        const data = await response.json();

        // 첫 번째 4개의 시리즈의 seriesKey를 가져옴
        const seriesKeys = data.series.slice(0, 4).map(series => series.seriesKey);
        return seriesKeys;
    } catch (error) {
        console.error('에러 : ', error);
    }
};

// 이미지 불러오기 및 렌더링 함수
const fetchDataAndRender = async (seriesKeys) => {
    const imageIds = [];

    for (const seriesKey of seriesKeys) {
        const endpoint = `/api/image/${studyKey}/${seriesKey}`;

        try {
            const response = await fetch(endpoint, {
                method: "POST"
            });
            const list = await response.json();

            list.forEach((base64, index) => {
                // api가 응답한 base64 인코딩 데이터를 -> 바이너리 스트링으로 디코딩
                const binaryString = atob(base64);
                // 디코딩된 문자열로 이미지아이디를 만들기위한 버퍼 생성
                const arrayBuffer = Uint8Array.from(binaryString, c => c.charCodeAt(0));
                // 이미지 아이디 만들기
                const imageId = `dicomweb:${URL.createObjectURL(new Blob([arrayBuffer], {type: 'application/dicom'}))}`;
                imageIds.push(imageId);

                // *번외
                if(index === 0) {
                    try {
                        const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
                        var dataSet = dicomParser.parseDicom(arrayBuffer, options);

                        var studyInstanceUid = dataSet.string('x0020000d');
                        console.log('studyInstanceUid : ', studyInstanceUid);

                        var pname = dataSet.string('x00100010');
                        console.log('pname : ', pname);
                    } catch(ex) {
                        console.log('Error parsing byte stream', ex);
                    }
                }
            });

        } catch (error) {
            console.error('에러 : ', error);
        }
    }

    render(imageIds);
};

// 렌더링 함수
const render = (imageIds) => {
    const renderingEngineId = 'myRenderingEngine';
    const viewportId = 'CT_AXIAL_STACK';

    // 툴 설정
    tools.setTools(viewportId, renderingEngineId);

    // Rendering Engine 및 Viewport 설정
    const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

    const viewportInput = {
        viewportId,
        element,
        type: cornerstone.Enums.ViewportType.STACK,
    };

    renderingEngine.enableElement(viewportInput);
    const viewport = renderingEngine.getViewport(viewportInput.viewportId);

    // 스택 설정
    viewport.setStack(imageIds, 0);

    // Viewport 렌더링
    viewport.render();
};

// 초기화 함수 호출 후 데이터 불러오기 및 렌더링
init()
    .then(async () => {
        const seriesKeys = await fetchSeriesKeys();
        fetchDataAndRender(seriesKeys);
    })
    .catch(console.error);
