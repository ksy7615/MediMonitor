function findUserModal() {
    document.getElementById('userModal').style.display = "block";
}

function closeUserModal() {
    document.getElementById('userModal').style.display = "none";
}

function searchUser() {
    const name = document.getElementById('searchName').value;

    $.ajax({
        url: `/find/username?name=${name}`,
        method: "POST",
        contentType: "application/json",
        success: function(data) {
            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '';
            if (data.length === 0) {
                const noResultDiv = document.createElement('div');
                noResultDiv.className = 'no-result';
                noResultDiv.innerText = '검색 결과가 없습니다.';
                resultsDiv.appendChild(noResultDiv);
            } else {
                data.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.className = 'user-result';
                    userDiv.innerText = user.username;
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
