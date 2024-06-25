let date = new Date();
let currYear = date.getFullYear(),
    currMonth = date.getMonth();

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
        liTag += `<li class = "inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // 오늘의 날짜를 표시하며 날짜 출력
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
                ? 'active'
                : '';
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // 이후 달 날짜
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class = "inactive">${i - lastDayofMonth + 1}</li>`;
    }
    daysTag.innerHTML = liTag;
};
renderCalendar();