let currentPage = 0;
const pageSize = 5;

document.getElementById('getAllStudiesBtn').addEventListener('click', function () {
    currentPage = 0;
    fetchStudies(currentPage, pageSize);
});

document.getElementById('left').addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
        fetchStudies(currentPage, pageSize);
    } else {
        alert("첫 페이지입니다.");
    }
});

document.getElementById('right').addEventListener('click', function () {
    fetch(`/mainAllSearch?page=${currentPage + 1}&size=${pageSize}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류: ' + response.status);
            }
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('서버에서 올바른 형식의 데이터를 반환하지 않았습니다.');
            }
        })
        .then(data => {
            if (data.content.length > 0) {
                currentPage++;
                updateTable(data);
            } else {
                alert("다음 페이지가 없습니다.");
            }
        })
        .catch(error => {
            console.error('오류 발생:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
});


function fetchStudies(page, size) {
    fetch(`/mainAllSearch?page=${page}&size=${size}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류: ' + response.status);
            }
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('서버에서 올바른 형식의 데이터를 반환하지 않았습니다.');
            }
        })
        .then(data => {
            updateTable(data);
        })
        .catch(error => {
            console.error('오류 발생:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function updateTable(data) {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    data.content.forEach(study => {
        const row = dataTable.insertRow();
        row.innerHTML = `
            <td>${study.pid}</td>
            <td>${study.pname}</td>
            <td>${study.modality}</td>
            <td>${study.studydesc}</td>
            <td>${study.studydate}</td>
            <td>${study.reportstatus}</td>
            <td>${study.seriescnt}</td>
            <td>${study.imagecnt}</td>
            <td>${study.examstatus}</td>
            <td><input type="hidden" class="studyinsuid" value="${study.studyinsuid}"></td>
            <td><input type="hidden" class="studykey" value="${study.studykey}"></td>
        `;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchStudies(currentPage, pageSize);

    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    table.addEventListener('click', function(event) {
        const targetRow = event.target.closest('tr');

        const pid = targetRow.querySelector('td:nth-child(1)').textContent;
        fetchStudiesByPid(pid);
    })

    table.addEventListener('dblclick', function (event) {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            // 데이터 추출
            const pid = targetRow.querySelector('td:nth-child(1)').textContent;
            const studyInsUid = targetRow.querySelector('.studyinsuid').value;
            const studyKey = targetRow.querySelector('.studykey').value;

            // URL 생성
            const url = `/path/to/destinationPage?studykey=${encodeURIComponent(studyKey)}&studyinsuid=${encodeURIComponent(studyInsUid)}&pid=${encodeURIComponent(pid)}`;

            // 페이지 이동
            window.location.href = url;
        }
    });
});

function fetchStudiesByPid(pId){
    fetch(`/mainPrevious/${pId}`)
        .then(response => {
            if(!response.ok){
                throw new Error('서버 응답 오류: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            displayStudyKeys(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

// 검사장비	검사설명	검사일시	판독상태	시리즈	이미지	Verify
function displayStudyKeys(data) {
    const dataTable = document.getElementById('previous-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    data.forEach(study => {
        const row = dataTable.insertRow();
        row.innerHTML = `
            <td>${study.modality}</td>
            <td>${study.studydesc}</td>
            <td>${study.studydate}</td>
            <td>${study.reportstatus}</td>
            <td>${study.seriescnt}</td>
            <td>${study.imagecnt}</td>
            <td>${study.examstatus}</td>
            <td><input type="hidden" class="pid" value="${study.pid}"></td>
            <td><input type="hidden" class="pname" value="${study.pname}"></td>
    `;

        const previousId = document.querySelector('.previous-id');
        const previousName = document.querySelector('.previous-name');

        previousId.textContent = `환자 아이디: ${study.pid}`;
        previousName.textContent = `환자 이름: ${study.pname}`;

    });
}