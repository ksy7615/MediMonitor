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

        let reportStatusText = '';
        switch (study.reportstatus) {
            case 6:
                reportStatusText = '판독';
                break;
            case 5:
                reportStatusText = '예비판독';
                break;
            case 4:
                reportStatusText = '열람중';
                break;
            case 3:
                reportStatusText = '읽지않음';
                break;
        }

        row.innerHTML = `
            <td>${study.pid}</td>
            <td>${study.pname}</td>
            <td>${study.modality}</td>
            <td>${study.studydesc}</td>
            <td>${study.studydate}</td>
            <td>${reportStatusText}</td>
            <td>${study.seriescnt}</td>
            <td>${study.imagecnt}</td>
            <td>${study.examstatus}</td>
<!--            <input type="hidden" class="studyinsuid" value="${study.studyinsuid}">-->
            <input type="hidden" class="studykey" value="${study.studykey}">
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
            // const pid = targetRow.querySelector('td:nth-child(1)').textContent;
            // const studyInsUid = targetRow.querySelector('.studyinsuid').value;
            const studyKey = targetRow.querySelector('.studykey').value;

            // URL 생성
            // const url = `/path/to/destinationPage?studykey=${encodeURIComponent(studyKey)}&studyinsuid=${encodeURIComponent(studyInsUid)}&pid=${encodeURIComponent(pid)}`;
            const url = `/path/to/destinationPage?studykey=${encodeURIComponent(studyKey)}`;

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

function displayStudyKeys(data) {
    const dataTable = document.getElementById('previous-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    data.forEach(study => {
        const row = dataTable.insertRow();

        let reportStatusText = '';
        switch (study.reportstatus) {
            case 6:
                reportStatusText = '판독';
                break;
            case 5:
                reportStatusText = '예비판독';
                break;
            case 4:
                reportStatusText = '열람중';
                break;
            case 3:
                reportStatusText = '읽지않음';
                break;
        }

        row.innerHTML = `
            <td>${study.modality}</td>
            <td>${study.studydesc}</td>
            <td>${study.studydate}</td>
            <td>${reportStatusText}</td>
            <td>${study.seriescnt}</td>
            <td>${study.imagecnt}</td>
            <td>${study.examstatus}</td>
           <input type="hidden" class="pid" value="${study.pid}">
            <input type="hidden" class="pname" value="${study.pname}">
    `;

        const previousId = document.querySelector('.previous-id');
        const previousName = document.querySelector('.previous-name');

        previousId.textContent = `환자 아이디: ${study.pid}`;
        previousName.textContent = `환자 이름: ${study.pname}`;

    });
}

// 달력 PART
let date = new Date();
let currYear = date.getFullYear(),
    currMonth = date.getMonth();

// 달력 밑 input 요소 value에 today 설정
let day = String(date.getDate()).padStart(2, '0');
let month = String(date.getMonth() + 1).padStart(2, '0');
let todayString = currYear + '-' + month + '-' + day;

document.querySelector('.date-end').value = todayString;

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// 달력 월 넘기는 버튼
const prevNextIcon = document.querySelectorAll('.material-icons');

// 달력 상단 연도, 월 출력
const currentDate = document.querySelector('.current-date');
currentDate.innerHTML = `${months[currMonth]} ${currYear}`;

const daysTag = document.querySelector('.days');

let startDate = null;
let endDate = null;

// input date 설정 함수
const updateInputDates = () => {
    const dateStartInput = document.querySelector('.date-start');
    const dateEndInput = document.querySelector('.date-end');
    if (startDate) {
        dateStartInput.value = startDate.toISOString().split('T')[0];
    }
    if (endDate) {
        dateEndInput.value = endDate.toISOString().split('T')[0];
    }
};

// month 넘기기
prevNextIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

// 캘린더를 불러오는 함수
const renderCalendar = () => {
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;

    // 현재 달의 마지막 날짜 확인
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

    let liTag = '';

    // 이전 달의 날짜 포함 출력
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class = "inactive" data-date="${currYear}-${String(currMonth).padStart(2, '0')}-${String(lastDateofLastMonth - i + 1).padStart(2, '0')}">${lastDateofLastMonth - i + 1}</li>`;
    }

    // 오늘의 날짜를 표시하며 날짜 출력
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
                ? 'active'
                : '';
        liTag += `<li class="${isToday}" data-date="${currYear}-${String(currMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}">${i}</li>`;
    }

    // 이후 달 날짜
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class = "inactive" data-date="${currYear}-${String(currMonth + 2).padStart(2, '0')}-${String(i - lastDayofMonth + 1).padStart(2, '0')}">${i - lastDayofMonth + 1}</li>`;
    }
    daysTag.innerHTML = liTag;

    // 기간 설정
    document.querySelectorAll('.days li').forEach(day => {
        day.addEventListener('click', () => {
            if (!day.classList.contains('inactive')) {
                const selectedDate = new Date(day.getAttribute('data-date'));
                if (!startDate || (startDate && endDate)) {
                    startDate = selectedDate;
                    endDate = null;
                } else if (startDate && !endDate) {
                    if (selectedDate < startDate) {
                        endDate = startDate;
                        startDate = selectedDate;
                    } else {
                        endDate = selectedDate;
                    }
                }
                updateInputDates();
                renderCalendar();
            }
        });
    });
};
renderCalendar();