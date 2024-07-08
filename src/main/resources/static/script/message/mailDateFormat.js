function formatMailDate(mailDate) {
    const now = new Date();
    const mailTime = new Date(mailDate);

    const diffTime = Math.abs(now - mailTime);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return `${diffMinutes}분 전`;
        }
        return `${diffHours}시간 전`;
    } else {
        const mailYear = mailTime.getFullYear();
        const mailMonth = ("0" + (mailTime.getMonth() + 1)).slice(-2);
        const mailDay = ("0" + mailTime.getDate()).slice(-2);
        return `${mailYear}-${mailMonth}-${mailDay}`;
    }
}

function formatDates() {
    const dateElements = document.querySelectorAll('.mailbox-date');
    dateElements.forEach(element => {
        const regDate = element.getAttribute('data-regdate');
        element.innerText = formatMailDate(regDate);
    });
}

document.addEventListener('DOMContentLoaded', formatDates);
