console.log('log.js is loaded'); // JavaScript 파일이 로드되었는지 확인

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed'); // DOMContentLoaded 이벤트가 발생했는지 확인

    const usernameElement = document.getElementById('username');
    if (!usernameElement) {
        console.error('Username element not found');
        return;
    }

    const username = usernameElement.value;
    console.log('Username:', username); // username 값이 올바르게 설정되었는지 확인

    function fetchLogs(username) {
        let url = '/log';
        let fetchOptions = {
            method: 'POST', // POST 메소드로 설정
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        };

        console.log('Sending request to:', url); // 디버깅용 로그
        console.log('Request body:', fetchOptions.body); // 디버깅용 로그

        fetch(url, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`서버에서 오류 발생 (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                updateLogTable(data);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            });
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
                <td>${log.regdate}</td>
            `;
        });
        console.log("Updated table with data:", data); // 디버깅용 로그
    }

    fetchLogs(username);
});
