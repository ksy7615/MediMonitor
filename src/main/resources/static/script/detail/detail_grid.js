import * as cornerstone from '@cornerstonejs/core'; // cornerstone 모듈 임포트
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'; // cornerstone DICOM 이미지 로더 모듈 임포트
import * as dicomParser from 'dicom-parser'; // dicom 파서 모듈 임포트
import * as tools from '../setTools.js'; // 사용자 정의 도구 모듈 임포트

const toggleBox = document.getElementById('toggle-box'); // 토글 박스 요소 가져오기
const thumbnailContainer = document.createElement('div'); // 썸네일 컨테이너 요소 생성
thumbnailContainer.style.display = 'flex'; // 썸네일 컨테이너를 flex로 설정
thumbnailContainer.style.flexDirection = 'column'; // 썸네일 컨테이너의 flex 방향을 column으로 설정
thumbnailContainer.style.marginRight = '10px'; // 썸네일 컨테이너의 오른쪽 여백 설정
toggleBox.appendChild(thumbnailContainer); // 썸네일 컨테이너를 토글 박스에 추가

const gridBtn = document.getElementById('grid-btn'); // 그리드 버튼 요소 가져오기
const gridContainer = document.getElementById('grid-container'); // 그리드 컨테이너 요소 가져오기
const gridItems = document.querySelectorAll('.grid-item'); // 모든 그리드 아이템 요소 가져오기
const content = document.getElementById('content'); // 컨텐츠 요소 가져오기

// 우클릭 방지 설정
content.oncontextmenu = (e) => e.preventDefault();

const paths = window.location.pathname; // 현재 페이지의 경로 가져오기
const pathParts = paths.split('/'); // 경로를 '/' 기준으로 분할하여 배열로 반환
const studyKey = pathParts[2]; // 경로의 세 번째 부분을 studyKey로 설정

let viewports = []; // 뷰포트 배열 초기화
const seriesImages = {}; // 시리즈 이미지 객체 초기화
let studyInfo = ""; // 스터디 정보 변수 초기화
let seriesList = []; // 시리즈 리스트 배열 초기화

// 초기화 함수
let renderingEngine; // 렌더링 엔진 변수
const init = async () => {
    await cornerstone.init(); // cornerstone 초기화

    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone; // cornerstone을 cornerstoneDICOMImageLoader의 외부 cornerstone으로 설정
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser; // dicomParser를 cornerstoneDICOMImageLoader의 외부 dicomParser로 설정

    const config = {
        maxWebWorkers: navigator.hardwareConcurrency || 1, // 최대 웹 워커 수 설정
        startWebWorkersOnDemand: true, // 필요 시 웹 워커 시작 설정
        taskConfiguration: {
            decodeTask: {
                initializeCodecsOnStartup: false, // 초기화 시 코덱 초기화 비활성화
            },
            sleepTask: {
                sleepTime: 3000, // 웹 워커가 활동하지 않을 때 슬립 시간 설정
            },
        },
    };

    cornerstoneDICOMImageLoader.webWorkerManager.initialize(config); // 웹 워커 매니저 초기화
    renderingEngine = new cornerstone.RenderingEngine('myRenderingEngine'); // 렌더링 엔진 생성
};

gridBtn.addEventListener('click', toggleGrid); // 그리드 버튼 클릭 시 toggleGrid 함수 호출

gridItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const row = parseInt(item.getAttribute('data-row')); // 아이템의 행 정보 가져오기
        const col = parseInt(item.getAttribute('data-col')); // 아이템의 열 정보 가져오기
        highlightCells(row, col); // 셀 강조 함수 호출
    });

    item.addEventListener('mouseleave', () => {
        clearHighlights(); // 강조 해제 함수 호출
    });

    item.addEventListener('click', () => {
        const row = parseInt(item.getAttribute('data-row')); // 아이템의 행 정보 가져오기
        const col = parseInt(item.getAttribute('data-col')); // 아이템의 열 정보 가져오기
        createGridInContent(row, col); // 컨텐츠에 그리드 생성 함수 호출

        toggleGrid(); // 그리드 토글 함수 호출
        fetchSeriesKeys().then(seriesList => {
            fetchDataAndRender(seriesList); // 시리즈 키 가져오기 및 데이터 렌더링 함수 호출
        }).catch(console.error); // 에러 발생 시 로그 출력
    });
});

function toggleGrid() {
    gridContainer.style.display = gridContainer.style.display === 'none' || gridContainer.style.display === '' ? 'flex' : 'none'; // 그리드 컨테이너의 디스플레이 속성 토글
}

function highlightCells(row, col) {
    gridItems.forEach(item => {
        const itemRow = parseInt(item.getAttribute('data-row')); // 아이템의 행 정보 가져오기
        const itemCol = parseInt(item.getAttribute('data-col')); // 아이템의 열 정보 가져오기

        item.classList.toggle('highlight', itemRow <= row && itemCol <= col); // 행과 열이 지정된 범위 내에 있을 경우 강조 클래스 토글
    });
}

function clearHighlights() {
    gridItems.forEach(item => {
        item.classList.remove('highlight'); // 모든 아이템의 강조 클래스 제거
    });
}

function createGridInContent(maxRow, maxCol) {
    content.innerHTML = ''; // 컨텐츠 초기화

    const totalRows = maxRow + 1; // 총 행 수 설정
    const totalCols = maxCol + 1; // 총 열 수 설정

    content.style.display = 'grid'; // 컨텐츠를 그리드로 설정
    content.style.gridTemplateColumns = `repeat(${totalCols}, 1fr)`; // 열 템플릿 설정
    content.style.gridTemplateRows = `repeat(${totalRows}, 1fr)`; // 행 템플릿 설정
    viewports = []; // 뷰포트 배열 초기화
    let cellId = 1; // 셀 ID 초기화
    for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
            const cell = document.createElement('div'); // 셀 요소 생성
            cell.className = 'viewport'; // 셀 클래스 설정
            cell.id = `viewport${cellId}`; // 셀 ID 설정
            cell.style.border = '1px solid #ccc'; // 셀 테두리 설정
            cell.style.width = '100%'; // 셀 너비 설정
            cell.style.height = '100%'; // 셀 높이 설정
            cell.oncontextmenu = (e) => e.preventDefault(); // 셀 우클릭 방지
            cell.ondrop = (e) => onDrop(e, cell); // 셀 드롭 이벤트 설정
            cell.ondragover = (e) => e.preventDefault(); // 셀 드래그 오버 이벤트 설정
            viewports.push(cell); // 뷰포트 배열에 셀 추가
            content.appendChild(cell); // 컨텐츠에 셀 추가
            cellId++; // 셀 ID 증가
        }
    }
}

const createThumbnailElement = (seriesKey) => {
    const thumbnail = document.createElement('div'); // 썸네일 요소 생성
    thumbnail.style.width = '100px'; // 썸네일 너비 설정
    thumbnail.style.height = '100px'; // 썸네일 높이 설정
    thumbnail.style.border = '1px solid black'; // 썸네일 테두리 설정
    thumbnail.style.margin = '5px'; // 썸네일 여백 설정
    thumbnail.draggable = true; // 썸네일 드래그 가능 설정
    thumbnail.ondragstart = (e) => onDragStart(e, seriesKey); // 썸네일 드래그 시작 이벤트 설정
    thumbnail.innerText = seriesKey; // 썸네일 텍스트 설정
    return thumbnail; // 썸네일 요소 반환
}

// 드래그 앤 드롭 이벤트
const onDragStart = (e, seriesKey) => {
    e.dataTransfer.setData('text/plain', seriesKey); // 드래그 시작 시 시리즈 키 설정
}

const onDrop = (e, element) => {
    e.preventDefault(); // 기본 동작 방지
    const seriesKey = e.dataTransfer.getData('text/plain'); // 드롭 시 시리즈 키 가져오기
    const viewportId = `CT_AXIAL_STACK-${element.id}`; // 뷰포트 ID 설정
    const imageIds = seriesImages[seriesKey]; // 시리즈 이미지 ID 가져오기
    if (imageIds) {
        displaySeries(seriesKey, element, renderingEngine.id, viewportId, imageIds); // 시리즈 디스플레이 함수 호출
        tools.setTools(viewportId, renderingEngine.id);  // 툴 재설정 함수 호출
    } else {
        console.error(`No images found for seriesKey: ${seriesKey}`); // 이미지가 없는 경우 에러 로그 출력
    }
}

async function fetchSeriesKeys() {
    const seriesEndpoint = `/api/detail/${studyKey}`; // 시리즈 엔드포인트 설정

    try {
        const response = await fetch(seriesEndpoint, { method: 'GET' }); // 시리즈 엔드포인트로 GET 요청
        const series = await response.json(); // 응답을 JSON으로 변환

        console.log("series:", series); // 시리즈 정보 로그 출력
        studyInfo = series.study; // 스터디 정보 설정
        seriesList = series.seriesList; // 시리즈 리스트 설정

        return series.seriesList; // 시리즈 리스트 반환
    } catch (e) {
        console.log("에러 출력:", e); // 에러 로그 출력
        return []; // 빈 배열 반환
    }
}

async function fetchSeriesImages(seriesKey) {
    if (seriesImages[seriesKey]) {
        // 이미 가져온 이미지가 있는 경우, 저장된 이미지 ID 배열 반환
        return seriesImages[seriesKey];
    }

    const imageEndpoint = `/api/image/${studyKey}/${seriesKey}`; // 이미지 엔드포인트 설정

    let imageIds = []; // 이미지 ID 배열 초기화
    try {
        const response = await fetch(imageEndpoint, { method: 'POST' }); // 이미지 엔드포인트로 POST 요청
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // 응답이 실패한 경우 에러 발생
        }
        const list = await response.json(); // 응답을 JSON으로 변환
        const files = list.fileList; // 파일 리스트 가져오기

        files.forEach((base64, index) => {
            const binaryString = atob(base64); // base64를 바이너리 문자열로 변환
            const arrayBuffer = Uint8Array.from(binaryString, c => c.charCodeAt(0)); // 바이너리 문자열을 Uint8Array로 변환
            const blob = new Blob([arrayBuffer], { type: 'application/dicom' }); // Uint8Array를 Blob으로 변환
            const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(blob, `image-${seriesKey}-${index}`); // Blob을 이미지 ID로 변환
            imageIds.push(imageId); // 이미지 ID 배열에 추가
        });

        seriesImages[seriesKey] = imageIds; // 시리즈 이미지 객체에 이미지 ID 추가
        console.log(`Image IDs for series ${seriesKey}:`, imageIds); // 이미지 ID 로그 출력
        return imageIds; // 이미지 ID 배열 반환

    } catch (e) {
        console.error("에러:", e); // 에러 로그 출력
        return []; // 빈 배열 반환
    }
}

async function fetchDataAndRender(seriesList) {
    const seriesPromises = seriesList.map(seriesKey => fetchSeriesImages(seriesKey)); // 시리즈 리스트를 기반으로 시리즈 이미지 가져오기 함수 호출
    await Promise.all(seriesPromises); // 모든 시리즈 이미지 가져오기 완료 대기

    let validSeriesIndex = 0; // 유효한 시리즈 인덱스 초기화
    for (let i = 0; i < viewports.length; i++) {
        while (validSeriesIndex < seriesList.length && (!seriesImages[seriesList[validSeriesIndex]] || seriesImages[seriesList[validSeriesIndex]].length === 0)) {
            validSeriesIndex++; // 유효한 시리즈 인덱스 찾기
        }

        if (validSeriesIndex < seriesList.length) {
            const seriesKey = seriesList[validSeriesIndex]; // 유효한 시리즈 키 설정
            const renderingEngineId = `myRenderingEngine-${viewports[i].id}`; // 렌더링 엔진 ID 설정
            const viewportId = `CT_AXIAL_STACK-${viewports[i].id}`; // 뷰포트 ID 설정
            const imageIds = seriesImages[seriesKey];  // 이미지를 다시 불러오지 않고 저장된 이미지 사용
            displaySeries(seriesKey, viewports[i], renderingEngineId, viewportId, imageIds); // 시리즈 디스플레이 함수 호출
            tools.setTools(viewportId, renderingEngine.id);  // 툴 설정 함수 호출
            validSeriesIndex++; // 유효한 시리즈 인덱스 증가
        }
    }
}

const displaySeries = (seriesKey, element, renderingEngineId, viewportId, imageIds) => {
    element.className = 'parentDiv'; // 시리즈가 로드된 뷰포트 스타일 적용
    if (imageIds && imageIds.length !== 0) {
        try {
            render(imageIds, element, renderingEngineId, viewportId); // 렌더 함수 호출
        } catch (e) {
            console.log(e); // 에러 로그 출력
        }
    }
}

const render = async (imageIds, element, renderingEngineId, viewportId) => {
    try {
        // Rendering Engine 및 Viewport 설정
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId); // 렌더링 엔진 생성

        const viewportInput = {
            viewportId: viewportId, // 뷰포트 ID 설정
            element: element, // 요소 설정
            type: cornerstone.Enums.ViewportType.STACK, // 뷰포트 타입 설정
        };

        renderingEngine.enableElement(viewportInput); // 뷰포트 요소 활성화
        const viewport = renderingEngine.getViewport(viewportInput.viewportId); // 뷰포트 가져오기

        // 추가
        tools.setTools(viewportId, renderingEngine.id);

        // 스택 설정
        viewport.setStack(imageIds, 0); // 스택 설정

        // Viewport 렌더링
        viewport.render(); // 뷰포트 렌더링

        console.log(`Rendered series on viewport ${viewportId}`); // 렌더링 완료 로그 출력
    } catch (error) {
        console.error(`Rendering error for viewport ${viewportId}:`, error); // 렌더링 에러 로그 출력
    }
};

const renderThumbnailsInOrder = (seriesList) => {
    seriesList.forEach(seriesKey => {
        if (seriesImages[seriesKey]) {
            const thumbnail = createThumbnailElement(seriesKey); // 썸네일 요소 생성
            thumbnailContainer.appendChild(thumbnail); // 썸네일 컨테이너에 썸네일 추가
        }
    });
};

init() // 초기화 함수 호출
    .then(fetchSeriesKeys) // 시리즈 키 가져오기 함수 호출
    .then(seriesList => {
        fetchDataAndRender(seriesList) // 데이터 가져오기 및 렌더링 함수 호출
            .then(() => renderThumbnailsInOrder(seriesList)); // 썸네일 순서대로 렌더링 함수 호출
    })
    .catch(console.error); // 에러 발생 시 로그 출력
