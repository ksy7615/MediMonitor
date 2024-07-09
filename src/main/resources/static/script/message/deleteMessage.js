$(document).ready(() => {
    $('#detailModalCloseBtn').click(function() {
        $('#detail-myModal').hide();
    });

    window.openDeleteModal = function() {
        $('#detail-myModal').show();
    }

    $('#detailModalDeleteBtn').click(function() {
        $('#detail-myModal').hide();
        const code = $('#detailModalDeleteBtn').val();
        var settings = {
            "url": "/message/delete",
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "code": code
            }),
        };

        $.ajax(settings).done(function (response) {
            if(response.status === 200) {
                // localStorage.setItem('reloadPreviousPage', 'true');
                window.history.back();
            }
        }).fail(function (response) {
            if(response.status === 400) {
                alert(response.message);
            }
        });
    });
    //
    // if (localStorage.getItem('reloadPreviousPage') === 'true') {
    //     localStorage.removeItem('reloadPreviousPage'); // 로컬 스토리지에서 플래그 제거
    //     location.reload(); // 페이지 새로고침
    // }
})