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
                window.history.back();
            }
        }).fail(function (response) {
            if(response.status === 400) {
                alert(response.message);
            }
        });
    });
})