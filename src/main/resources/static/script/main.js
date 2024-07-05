document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 0;
    const pageSize = 5;
    let totalPages = 0;
    let currentStudyKey = null; // 전역 변수 추가
    let searchParams = null;

    document.getElementById('getAllStudiesBtn').addEventListener('click', function () {
        currentPage = 0;
        searchParams = null;
        fetchStudies(currentPage, pageSize, false);
    });

    document.getElementById('reset').addEventListener('click', function () {
        document.getElementById('pid').value = '';
        document.getElementById('pname').value = '';
        document.getElementById('reportstatus').value = '';
        document.getElementById('modality').value = '';
        const startDateElem = document.getElementById('startDate');
        const endDateElem = document.getElementById('endDate');
        if (startDateElem) startDateElem.value = '1990-01-01';
        if (endDateElem) endDateElem.value = todayString;

        // 초기화 후 전체 데이터를 다시 불러오기
        currentPage = 0;
        searchParams = null;
        fetchStudies(currentPage, pageSize, false);
    })

    document.getElementById('left').addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage--;
            fetchStudies(currentPage, pageSize, !!searchParams);
        } else {
            alert("첫 페이지입니다.");
        }
    });

    document.getElementById('right').addEventListener('click', function () {
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchStudies(currentPage, pageSize, !!searchParams);
        } else {
            alert("다음 페이지가 없습니다.");
        }
    });

    function fetchStudies(page, size, isSearch) {
        let url;
        let fetchOptions = {};

        if (isSearch && searchParams) {
            url = `/main/search?page=${page}&size=${size}`;
            fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchParams)
            };
        } else {
            url = `/mainAllSearch?page=${page}&size=${size}`;
        }

        fetch(url, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`서버에서 오류 발생 (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                updateTable(data);
                totalPages = data.totalPages;
                updatePageInfo(data.pageable.pageNumber, totalPages);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            });
    }

    function searchStudies(page, size) {
        const pid = document.getElementById('pid').value || '';
        const pname = document.getElementById('pname').value || '';
        const reportstatus = document.getElementById('reportstatus').value || '';
        const modality = document.getElementById('modality').value || '';
        const startDateElem = document.getElementById('startDate');
        const endDateElem = document.getElementById('endDate');
        const startDate = startDateElem ? startDateElem.value : '';
        const endDate = endDateElem ? endDateElem.value : '';

        searchParams = {
            pid: pid,
            pname: pname,
            reportstatus: reportstatus !== '' ? reportstatus : null,
            modality: modality,
            startDate: startDate,
            endDate: endDate
        };

        console.log('Request Data:', searchParams); // 요청 데이터 로그

        fetchStudies(page, size, true);
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
                <td class="studydate">${study.studydate}</td>
                <td>${reportStatusText}</td>
                <td>${study.seriescnt}</td>
                <td>${study.imagecnt}</td>
                <td>${study.examstatus}</td>
                <input type="hidden" class="studykey" value="${study.studykey}">
            `;
        });
        console.log("Updated table with data:", data); // 디버깅용 로그 추가
    }

    function getReportStatusText(status) {
        switch (status) {
            case 'decipher':
                return '판독';
            case 'predecipher':
                return '예비판독';
            case 'reading':
                return '열람중';
            case 'notread':
                return '읽지않음';
            default:
                return '읽지않음';
        }
    }

    document.getElementById('searchButton').addEventListener('click', function () {
        currentPage = 0;
        searchStudies(currentPage, pageSize);
    });

    fetchStudies(currentPage, pageSize, false);

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
            const studyDate = targetRow.querySelector('.studydate').textContent;

            console.log('studydate: ' + studyDate);

            // ▼ 실제 사용할 url
            // const url = `/detail/${encodeURIComponent(studyKey)}/${encodeURIComponent(studyDate)}`;
            // ▼ 재현님이랑 겹치니까 임시로 설정해둔 url
            const url = `/detail/${encodeURIComponent(studyKey)}/${encodeURIComponent(studyDate)}`;
            window.location.href = url;
        }
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
                    checkPreDoctor(username)
                        .then(equals => {
                            if (equals) {
                                updateReport(reportData);
                            } else {
                                checkFirstDoctorValue(currentStudyKey)
                                    .then(exists => {
                                        if (exists) {
                                            alert('담당자만 관리 가능합니다.');
                                        } else {
                                            alert('이미 판독이 완료되었습니다.');
                                        }
                                    });
                            }
                        });
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

    document.getElementById("btn-reading").addEventListener('click', () => {
        const comment = document.getElementById('comment').value;
        const quest = document.getElementById('quest').value;
        const username = document.getElementById('username').value;
        if (!currentStudyKey) {
            alert("먼저 항목을 선택하세요.");
            return;
        }

        const reportFirstData = {
            studykey: currentStudyKey,
            comment: comment,
            exploration: quest,
            status: 'decipher',
            firstDoctor: username
        };

        const reportSecondData = {
            studykey: currentStudyKey,
            comment: comment,
            exploration: quest,
            status: 'decipher',
            secondDoctor: username
        };

        // studykey가 존재하는지 확인
        checkStudyKeyExistence(currentStudyKey)
            .then(exists => {
                // 존재O -> INSERT 되어 있는 것이므로 UPDATE 하기
                if (exists) {
                    // 판독의2에 값이 존재하는지 확인
                    checkSecondDoctorValue(currentStudyKey)
                        .then(isEmpty => {
                            // 예비판독을 한 의사여부 확인
                            checkPreDoctor(username)
                                .then(equals => {
                                    if (equals) {
                                        alert('예비판독의는 판독이 불가합니다.');
                                        return null;
                                    } else {
                                        // 만약 판독의2가 비어있으면
                                        if (isEmpty) {
                                            // 판독의1 값이 있는지 없는지 확인
                                            checkFirstDoctorValue(currentStudyKey)
                                                .then(isEmpty => {
                                                    // 판독의1 값이 존재하면 -> 이미 판독의에 들어간 값인지 확인 후 -> 판독의 2에 기록
                                                    if (!isEmpty) {
                                                        // 판독의1과 동일한가?
                                                        checkFirstDoctor(currentStudyKey)
                                                            .then(value => {
                                                                console.log(typeof value === 'string');

                                                                // 동일하면 내용만 update
                                                                if (value === username) {
                                                                    console.log('판독의 1 값과 동일 -> 업데이트')
                                                                    updateReport(reportFirstData);
                                                                } else {
                                                                    // 다르면 판독의 2 추가
                                                                    console.log('판독의 1 값과 다름 -> 판독의 2에 기록');
                                                                    updateSecondReport(reportSecondData);
                                                                }
                                                            });
                                                    } else {
                                                        // 판독의1 값이 존재하지 않으면
                                                        console.log('판독의1에 값 넣기');
                                                        updateFirstReport(reportFirstData);
                                                    }
                                                });
                                        } else {
                                            // 비어있지 않으면 판독의1,2의 내용 수정만 가능
                                            // 판독의1 확인
                                            checkFirstDoctor(currentStudyKey)
                                                .then(value => {
                                                    if (value === username) {
                                                        console.log('판독의1의 값 수정');
                                                        updateReport(reportFirstData);
                                                    } else {
                                                        // 판독의1이 아니면 판독의2인지 확인
                                                        checkSecondDoctor(currentStudyKey)
                                                            .then(value => {
                                                                if (value === username) {
                                                                    console.log('판독의2의 값 수정');
                                                                    updateSecondReport(reportSecondData);
                                                                } else {
                                                                    alert('담당자만 관리 가능합니다.');
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    }
                                });
                        });
                } else {
                    // firstDoctor 인지, secondDoctor인지 다르기 때문에 각각 써줌
                    console.log('여기2');
                    saveReport(reportFirstData);
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

    function checkSecondDoctorValue(studykey) {
        return fetch(`/checkSecondDoctorValue?studykey=${studykey}`)
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

    function checkFirstDoctorValue(studykey) {
        return fetch(`/checkFirstDoctorValue?studykey=${studykey}`)
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

    function checkPreDoctor(username) {
        return fetch(`/checkPreDoctor?studykey=${currentStudyKey}&username=${username}`)
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

    function checkFirstDoctor(studykey) {
        return fetch(`/checkFirstDoctor?studykey=${studykey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다: ' + response.statusText);
                }
                return response.text();  // JSON 대신 텍스트로 응답을 받음
            })
            .then(text => {
                try {
                    return JSON.parse(text);  // JSON 파싱 시도
                } catch (error) {
                    return text;  // 파싱에 실패하면 텍스트 반환
                }
            })
            .catch(error => {
                console.error('오류 발생: ', error);
                throw error;
            });
    }

    function checkSecondDoctor(studykey) {
        return fetch(`/checkSecondDoctor?studykey=${studykey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다: ' + response.statusText);
                }
                return response.text();  // JSON 대신 텍스트로 응답을 받음
            })
            .then(text => {
                try {
                    return JSON.parse(text);  // JSON 파싱 시도
                } catch (error) {
                    return text;  // 파싱에 실패하면 텍스트 반환
                }
            })
            .catch(error => {
                console.error('오류 발생: ', error);
                throw error;
            });
    }

    function updateFirstReport(reportData) {
        fetch('/updateFirstReport', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error('네트워크 응답이 올바르지 않습니다: ' + text);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('업데이트 성공:', data);
                alert('성공적으로 저장 되었습니다.');
            })
            .catch(error => {
                console.error('업데이트 중 오류 발생:', error);
                alert('업데이트 중 오류가 발생했습니다.');
            });
    }

    function updateSecondReport(reportData) {
        fetch('/updateSecondReport', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error('네트워크 응답이 올바르지 않습니다: ' + text);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('업데이트 성공:', data);
                alert('성공적으로 저장 되었습니다.');
            })
            .catch(error => {
                console.error('업데이트 중 오류 발생:', error);
                alert('업데이트 중 오류가 발생했습니다.');
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
                    return response.text().then(text => {
                        throw new Error('네트워크 응답이 올바르지 않습니다: ' + text);
                    });
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
        fetch('/saveReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error('네트워크 응답이 올바르지 않습니다: ' + text);
                    });
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
                <td class="studydate">${study.studydate}</td>
                <td>${reportStatusText}</td>
                <td>${study.seriescnt}</td>
                <td>${study.imagecnt}</td>
                <td>${study.examstatus}</td>
                <input type="hidden" class="pid" value="${study.pid}">
                <input type="hidden" class="pname" value="${study.pname}">
                <input type="hidden" class="studykey" value="${study.studykey}">
            `;
            document.querySelector('.previous-id').textContent = `환자 아이디: ${study.pid}`;
            document.querySelector('.previous-name').textContent = `환자 이름: ${study.pname}`;
        });
    }

    const previousTable = document.getElementById('previous-table').getElementsByTagName('tbody')[0];
    previousTable.addEventListener('click', function (event) {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            currentStudyKey = targetRow.querySelector('.studykey').value;
            fetchReportByStudykey(currentStudyKey);
        }
    });

    previousTable.addEventListener('dblclick', function (event) {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            const studyKey = targetRow.querySelector('.studykey').value;
            const studyDate = targetRow.querySelector('.studydate').textContent;
            // const url = `/detail/${encodeURIComponent(studyKey)}/${encodeURIComponent(studyDate)}`;
            // 임시
            const url = `/detail/${encodeURIComponent(studyKey)}`;
            window.location.href = url;
        }
    });

    const removeReportBtn = document.getElementById('removeReport');
    const commentBox = document.getElementById('comment');
    const questBox = document.getElementById('quest');

    removeReportBtn.addEventListener('click', function () {
        // comment와 quest 내용을 비웁니다.
        commentBox.value = '';
        questBox.value = '';
    });

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
});