// modal.js

function findUserModal() {
    document.getElementById('userModal').style.display = "block";
}

function closeUserModal() {
    document.getElementById('userModal').style.display = "none";
}

function searchUser() {
    const name = document.getElementById('searchName').value;

    // jQuery의 ajax 메서드를 사용하여 POST 요청을 보냄
    $.ajax({
        url: `/find/username?name=${name}`,
        method: "POST",
        contentType: "application/json",
        success: function(data) {
            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '';
            if (data.length === 0) {
                // 검색 결과가 없을 때 표시할 문구
                const noResultDiv = document.createElement('div');
                noResultDiv.className = 'no-result';
                noResultDiv.innerText = '검색 결과가 없습니다.';
                resultsDiv.appendChild(noResultDiv);
            } else {
                // 응답으로 받은 데이터 배열을 순회하면서 사용자 정보를 표시
                data.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.className = 'user-result';
                    userDiv.innerText = user.username;  // 사용자 이름을 div에 설정
                    userDiv.onclick = () => selectUser(user.username);
                    resultsDiv.appendChild(userDiv);
                });
            }
        },
        error: function(error) {
            alert("검색 결과 가져오기에 실패하였습니다.")
        }
    });
}

function selectUser(username) {
    document.getElementById('recipient').value = username;
    closeUserModal();
}
