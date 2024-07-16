
const paths = window.location.pathname;
const pathParts = paths.split('/');
let currentStudyKey = pathParts[2];


function toggleBox() {
    var toggleBox = document.getElementById('toggle-box');
    var mainPanel = document.getElementById('content');

    if (toggleBox.classList.contains('active')) {
        toggleBox.classList.remove('active');
        mainPanel.classList.remove('shifted');
    } else {
        toggleBox.classList.add('active');
        mainPanel.classList.add('shifted');
    }
}


function showModal() {
    document.getElementById('modal').style.display = 'block';
    fetchReportByStudykey(currentStudyKey);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
}



function fetchReportByStudykey(studykey) {
    fetch(`/mainReport/${studykey}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            getAllStudiesInfo(currentStudyKey);
            displayReport(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



function displayReport(data) {
    const commentBox = document.getElementById('comment');
    const questBox = document.getElementById('quest');
    const studyDateBox = document.getElementById('studyDate');
    const preDoctorBox = document.getElementById('preDoctor');
    const firstDoctorBox = document.getElementById('firstDoctor');
    const secondDoctorBox = document.getElementById('secondDoctor');


    if (data.length >= 1) {
        const comment = data[0].comment;
        const exploration = data[0].exploration;
        const studyDate = formatTimestamp(data[0].regDate);
        const preDoctor = data[0].preDoctor;
        const firstDoctor = data[0].firstDoctor;
        const secondDoctor = data[0].secondDoctor;
        commentBox.value = comment !== null ? comment : '';
        questBox.value = exploration !== null ? exploration : '';
        studyDateBox.value = studyDate !== null ? studyDate : '';
        preDoctorBox.value = preDoctor !== null ? preDoctor : '';
        firstDoctorBox.value = firstDoctor !== null ? firstDoctor : '';
        secondDoctorBox.value = secondDoctor !== null ? secondDoctor : '';
    } else {
        commentBox.value = '';
        questBox.value = '';
        preDoctorBox.value = '';
        firstDoctorBox.value = '';
        secondDoctorBox.value = '';
        studyDateBox.value='';
    }
}

function getAllStudiesInfo(studykey) {
    fetch(`/allInfo/${studykey}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            displayReportInfo(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

function displayReportInfo(data) {

    const modalHeader = document.querySelector('.modal-header');

    modalHeader.innerHTML = '';

    data.forEach(item => {
        modalHeader.innerHTML = `
            <label>환자정보 : </label>
            <label>${item.pname}</label>
            <label> / </label>
            <label>${item.pid}</label>
            <label> / </label>
            <label>${item.pbirthdatetime}</label>
            <br>
            <label>검사 날짜 : </label>
            <label>${item.studydate}</label>
            <br>
            <label>검사명 : </label>
            <label>${item.studydesc}</label>
        `;
    });
}

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


    checkStudyKeyExistence(currentStudyKey)
        .then(exists => {

            if (exists) {
                checkSecondDoctorValue(currentStudyKey)
                    .then(isEmpty => {
                        checkPreDoctor(username)
                            .then(equals => {
                                if (equals) {
                                    alert('예비판독의는 판독이 불가합니다.');
                                    return null;
                                } else {
                                    if (isEmpty) {
                                        checkFirstDoctorValue(currentStudyKey)
                                            .then(isEmpty => {
                                                if (!isEmpty) {
                                                    checkFirstDoctor(currentStudyKey)
                                                        .then(value => {
                                                            if (value === username) {
                                                                updateReport(reportFirstData);
                                                            } else {
                                                                updateSecondReport(reportSecondData);
                                                            }
                                                        });
                                                } else {
                                                    updateFirstReport(reportFirstData);
                                                }
                                            });
                                    } else {
                                        checkFirstDoctor(currentStudyKey)
                                            .then(value => {
                                                if (value === username) {
                                                    updateReport(reportFirstData);
                                                } else {
                                                    checkSecondDoctor(currentStudyKey)
                                                        .then(value => {
                                                            if (value === username) {
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
            return response.text();
        })
        .then(text => {
            try {
                return JSON.parse(text);
            } catch (error) {
                return text;
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
            return response.text();
        })
        .then(text => {
            try {
                return JSON.parse(text);
            } catch (error) {
                return text;
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
            alert('성공적으로 저장 되었습니다.');
            fetchReportByStudykey(currentStudyKey);
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
            alert('성공적으로 저장 되었습니다.');
            fetchReportByStudykey(currentStudyKey);
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
            alert('성공적으로 업데이트 되었습니다.');
            fetchReportByStudykey(currentStudyKey);
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
            alert('성공적으로 저장되었습니다.');
            fetchReportByStudykey(currentStudyKey);
        })
        .catch(error => {
            console.error('저장 중 오류 발생:', error);
            alert('저장 중 오류가 발생했습니다.');
        });
}