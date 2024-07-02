
const paths = window.location.pathname;
const pathParts = paths.split('/');
let currentStudyKey = pathParts[2];


// 토글박스
function toggleBox() {
    var toggleBox = document.getElementById('toggle-box');
    var mainPanel = document.getElementById('main-panel');

    if (toggleBox.classList.contains('active')) {
        toggleBox.classList.remove('active');
        mainPanel.classList.remove('shifted');
    } else {
        toggleBox.classList.add('active');
        mainPanel.classList.add('shifted');
    }
}


// 모달창 띄우기
function showModal() {
    document.getElementById('modal').style.display = 'block';
    console.log("key: " + currentStudyKey);
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



// 리포트 시작
function fetchReportByStudykey(studykey) {
    fetch(`/mainReport/${studykey}`)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            console.log(data);
            displayReport(data);
        })
        .catch(error => {
            console.error('오류 발생', error);
            alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
}

// timestamp 포맷팅
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
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