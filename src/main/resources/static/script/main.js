let currentPage = 0;
const pageSize = 5;
let totalPages = 0;
let currentStudyKey = null; // 전역 변수 추가

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
    if (currentPage < totalPages - 1) {
        currentPage++;
        fetchStudies(currentPage, pageSize);
    } else {
        alert("다음 페이지가 없습니다.");
    }
});

function fetchStudies(page, size) {
    fetch(`/mainAllSearch?page=${page}&size=${size}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            updateTable(data);
            totalPages = data.totalPages;
            updatePageInfo(data.pageable.pageNumber, totalPages);
        })
        .catch(error => {
            console.error('오류 발생:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function updatePageInfo(currentPage, totalPages) {
    document.getElementById('pageCnt').textContent = `${currentPage + 1}/${totalPages}ㅤ`;
}

function updateTable(data) {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    data.content.forEach(item => {
        const row = dataTable.insertRow();
        const study = item.study;
        const reportStatus = item.report.status;

        const reportStatusText = getReportStatusText(reportStatus);

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
            <input type="hidden" class="studykey" value="${study.studykey}">
        `;
    });
}

function getReportStatusText(status) {
    switch (status) {
        case 'decipher': return '판독';
        case 'predecipher': return '예비판독';
        case 'reading': return '열람중';
        case 'notread': return '읽지않음';
        default: return '읽지않음';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchStudies(currentPage, pageSize);

    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    table.addEventListener('click', function (event) {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            const pid = targetRow.querySelector('td:nth-child(1)').textContent;
            currentStudyKey = targetRow.querySelector('.studykey').value; // currentStudyKey 업데이트

            enableReportInputs();
            fetchStudiesByPid(pid);
            fetchReportByStudykey(currentStudyKey);
        }
    });

    table.addEventListener('dblclick', function (event) {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            const studyKey = targetRow.querySelector('.studykey').value;
            const url = `/path/to/destinationPage?studykey=${encodeURIComponent(studyKey)}`;
            window.location.href = url;
        }
    });
});

document.getElementById("btn-pre-reading").addEventListener('click', () => {
    const comment = document.getElementById('comment').value;
    const quest = document.getElementById('quest').value;
    const username = document.getElementById('username').value;

    if (!currentStudyKey) {
        alert("먼저 항목을 선택하세요.");
        return;
    }

    const reportData = {
        studykey: currentStudyKey,
        comment: comment,
        exploration: quest,
        status: 'predecipher',
        preDoctor: username
    };

    // studykey가 존재하는지 확인하는 함수 호출
    checkStudyKeyExistence(currentStudyKey)
        .then(exists => {
            if (exists) {
                // studykey가 존재하면 업데이트
                updateReport(reportData);
            } else {
                // studykey가 존재하지 않으면 삽입
                saveReport(reportData);
            }
        })
        .catch(error => {
            console.error('오류 발생:', error);
            alert('저장 중 오류가 발생했습니다.');
        });
});

function checkStudyKeyExistence(studykey) {
    return fetch(`/checkStudyKeyExistence?studykey=${studykey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('오류 발생:', error);
            throw error;
        });
}

function updateReport(reportData) {
    fetch('/updateReport', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error('네트워크 응답이 올바르지 않습니다: ' + text); });
            }
            return response.json();
        })
        .then(data => {
            console.log('업데이트 성공:', data);
            alert('성공적으로 업데이트 되었습니다.');
        })
        .catch(error => {
            console.error('업데이트 중 오류 발생:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        });
}

function saveReport(reportData) {
    fetch('/savePreReport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error('네트워크 응답이 올바르지 않습니다: ' + text); });
            }
            return response.json();
        })
        .then(data => {
            console.log('저장 성공:', data);
            alert('성공적으로 저장되었습니다.');
        })
        .catch(error => {
            console.error('저장 중 오류 발생:', error);
            alert('저장 중 오류가 발생했습니다.');
        });
}

function enableReportInputs() {
    document.getElementById('comment').disabled = false;
    document.getElementById('quest').disabled = false;
}

function fetchStudiesByPid(pId) {
    fetch(`/mainPrevious/${pId}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            displayPrevious(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function fetchReportByStudykey(studykey) {
    fetch(`/mainReport/${studykey}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            displayReport(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function displayReport(data) {
    const commentBox = document.getElementById('comment');
    const questBox = document.getElementById('quest');
    const preDoctorBox = document.getElementById('preDoctor');
    const firstDoctorBox = document.getElementById('firstDoctor');
    const secondDoctorBox = document.getElementById('secondDoctor');

    if (data.length >= 1) {
        const comment = data[0].comment;
        const exploration = data[0].exploration;
        const preDoctor = data[0].preDoctor;
        const firstDoctor = data[0].firstDoctor;
        const secondDoctor = data[0].secondDoctor;

        commentBox.value = comment !== null ? comment : '';
        questBox.value = exploration !== null ? exploration : '';
        preDoctorBox.value = preDoctor !== null ? preDoctor : '';
        firstDoctorBox.value = firstDoctor !== null ? firstDoctor : '';
        secondDoctorBox.value = secondDoctor !== null ? secondDoctor : '';
    } else {
        commentBox.value = '';
        questBox.value = '';
        preDoctorBox.value = '';
        firstDoctorBox.value = '';
        secondDoctorBox.value = '';
    }
}

function displayPrevious(data) {
    const dataTable = document.getElementById('previous-table').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    data.forEach(item => {
        const row = dataTable.insertRow();

        const study = item.study;
        const reportStatus = item.report.status;

        const reportStatusText = getReportStatusText(reportStatus);

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

        document.querySelector('.previous-id').textContent = `환자 아이디: ${study.pid}`;
        document.querySelector('.previous-name').textContent = `환자 이름: ${study.pname}`;
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
    icon.addEventListener('click', (event) => {
        event.preventDefault();
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

// 검색 파트
function searchStudies() {
    const pid = document.getElementById('pid').value || '';
    const pname = document.getElementById('pname').value || '';
    const reportstatus = document.getElementById('reportstatus').value || -1;
    const modality = document.getElementById('modality').value || '';
    const startDateElem = document.getElementById('startDate');
    const endDateElem = document.getElementById('endDate');

    const startDate = startDateElem ? startDateElem.value : '';
    const endDate = endDateElem ? endDateElem.value : '';

    const requestData = {
        pid: pid,
        pname: pname,
        reportstatus: reportstatus,
        modality: modality,
        startDate: startDate,
        endDate: endDate
    };

    fetch('/main/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('검색 결과:', data);
            displayResults(data); // displayResults 함수로 결과를 보여줍니다.
        })
        .catch(error => {
            console.error('데이터를 불러오는 중 오류 발생:', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

document.getElementById('searchButton').addEventListener('click', function (event) {
    event.preventDefault(); // 기본 동작 막기
    searchStudies();
});

function displayResults(data) {
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
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
            default:
                reportStatusText = '알 수 없음';
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
        `;
    });
}