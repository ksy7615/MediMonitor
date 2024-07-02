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