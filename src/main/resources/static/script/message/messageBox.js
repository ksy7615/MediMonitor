$(document).ready(function() {
    var isAllSelected = false;

    $('#mailbox-select-all').click(function() {
        if (isAllSelected) {
            $('input.mailbox-checkbox').prop('checked', false);
            isAllSelected = false;
            $(this).text('전체선택');
        } else {
            $('input.mailbox-checkbox').prop('checked', true);
            isAllSelected = true;
            $(this).text('전체해제');
        }
    });
});


function deleteButtonMenu() {
    let selectedMessages = [];
    $(".mailbox-checkbox:checked").each(function() {
        selectedMessages.push($(this).data('code'));
    });

    if (selectedMessages.length > 0) {
        var settings = {
            "url": "/message/delete/checked",
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(selectedMessages),
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
        alert('삭제할 쪽지를 선택해 주세요.');
    }
}
