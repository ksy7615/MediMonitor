document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 0;
    const pageSize = 10;
    let totalPages = 0;

    document.getElementById('left').addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage--;
            fetchLogs(username, currentPage, pageSize);
        } else {
            alert("첫 페이지입니다.");
        }
    });

    document.getElementById('right').addEventListener('click', function () {
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchLogs(username, currentPage, pageSize);
        } else {
            alert("다음 페이지가 없습니다.");
        }
    });

    const usernameElement = document.getElementById('username');
    if (!usernameElement) {
        console.error('Username element not found');
        return;
    }

    const username = usernameElement.value;
    console.log('Username:', username); // username 값이 올바르게 설정되었는지 확인

    function fetchLogs(username, page, size) {
        let url = `/log?page=${page}&size=${size}`;
        let fetchOptions = {
            method: 'POST', // POST 메소드로 설정
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        };

        fetch(url, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`서버에서 오류 발생 (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                totalPages = data.totalPages;
                updateLogTable(data.content);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            });
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toISOString().substring(0, 10) + ' ' + date.toISOString().substring(11, 19);
    }

    function updateLogTable(data) {
        const dataTable = document.getElementById('log-table').getElementsByTagName('tbody')[0];
        dataTable.innerHTML = '';
        data.forEach(item => {
            const row = dataTable.insertRow();
            const log = item;

            row.innerHTML = `
                <td>${log.code}</td>
                <td>${log.studykey}</td>
                <td>${log.username}</td>
                <td>${formatDate(log.regDate)}</td>
            `;
        });
    }

    fetchLogs(username, currentPage, pageSize);
});