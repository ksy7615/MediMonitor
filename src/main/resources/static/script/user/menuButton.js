// document.addEventListener('DOMContentLoaded', function() {
//     var currentPage = parseInt(document.getElementById("currentPage").value);
//     var totalPages = parseInt(document.getElementById("totalPages").value);
//
//     function loadUsers(page) {
//         window.location.href = '/admin/authority?page=' + page;
//     }
//
//     document.getElementById("left").addEventListener("click", function() {
//         if (currentPage > 0) {
//             loadUsers(currentPage - 1);
//         }
//     });
//
//     document.getElementById("right").addEventListener("click", function() {
//         if (currentPage < totalPages - 1) {
//             loadUsers(currentPage + 1);
//         }
//     });
//
//     // 페이지 로드 시 초기 값 설정
//     document.getElementById("pageCnt").textContent = (currentPage + 1) + " / " + totalPages;
// });



$("#selectAll").click(function() {
    $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
});

// Toggle dropdown menu
function toggleDropdownMenu() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function deleteBtnMenu() {
    let selectedUsers = [];
    $(".userCheckbox:checked").each(function() {
        selectedUsers.push($(this).data('username'));
    });

    if (selectedUsers.length > 0) {
        var settings = {
            "url": "/user/reject",
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(selectedUsers),
        };

        $.ajax(settings).done(function (response) {
            if(response.status === 200) {
                alert(response.message);
                location.reload();
            }
        }).fail(function (response) {
            if(response.status === 400) {
                alert(response.message);
            }
        });
    } else {
        alert('삭제할 사용자를 선택해 주세요.');
    }
}

// 선택된 사용자를 승인하는 기능
document.getElementById('approveBtn').addEventListener('click', function() {
    let selectedUsers = [];
    $(".userCheckbox:checked").each(function() {
        selectedUsers.push($(this).data('username'));
    });

    if (selectedUsers.length > 0) {
        var settings = {
            "url": "/user/approval",
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(selectedUsers),
        };

        $.ajax(settings).done(function (response) {
            if(response.status === 200) {
                alert(response.message);
                location.reload();
            }
        }).fail(function (response) {
            if(response.status === 400) {
                alert(response.message);
            }
        });
    } else {
        alert('승인할 사용자를 선택해 주세요.');
    }
});

// 선택된 사용자를 거절하는 기능
document.getElementById('rejectBtn').addEventListener('click', function() {
    let selectedUsers = [];
    $(".userCheckbox:checked").each(function() {
        selectedUsers.push($(this).data('username'));
    });

    if (selectedUsers.length > 0) {
        var settings = {
            "url": "/user/reject",
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(selectedUsers),
        };

        $.ajax(settings).done(function (response) {
            if(response.status === 200) {
                alert(response.message);
                location.reload();
            }
        }).fail(function (response) {
            if(response.status === 400) {
                alert(response.message);
            }
        });
    } else {
        alert('거절할 사용자를 선택해 주세요.');
    }
});