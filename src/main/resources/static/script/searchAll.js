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
    fetch(`/mainData?page=${currentPage + 1}&size=${pageSize}`)
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
    fetch(`/mainData?page=${page}&size=${size}`)
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
            <td>${study.studykey}</td>
            <td>${study.pname}</td>
            <td>${study.modality}</td>
            <td>${study.studydesc}</td>
            <td>${study.studydate}</td>
            <td>${study.reportstatus}</td>
            <td>${study.seriescnt}</td>
            <td>${study.imagecnt}</td>
            <td>${study.examstatus}</td>
        `;
    });
}