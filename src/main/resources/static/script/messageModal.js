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

// modal.js

function openMiniInbox() {
    $('#mini-inbox-modal').css('display', 'block');

    var settings = {
        "url": "/find/miniInbox",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        const mailList = $('.inbox-mail-list');
        mailList.empty(); // 기존 리스트 초기화

        if (response.length === 0) {
            const emptyMessage = $('<span></span>').attr('id', 'emptyMessage').text('쪽지함이 비었습니다.');
            mailList.append(emptyMessage);
        } else {
            response.forEach(message => {
                const list = $('<li></li>');

                const mailSender = $('<span></span>').addClass('mail-sender').text(message.sender);
                const mailSubject = $('<span></span>').addClass('mail-subject').text(message.title) .attr('onclick', 'openDetailModal(' + message.code + ')');

                const mailTime = $('<span></span>').addClass('mail-time').text(formatMailDate(message.regDate));

                list.append(mailSender, mailSubject, mailTime);
                mailList.append(list);
            });
        }
    }).fail(function (response) {
        alert("쪽지 가져오기에 실패했습니다.");
    });
}

function closeMiniInbox() {
    $('#mini-inbox-modal').css('display', 'none');
}

function openMiniSent() {
    $('#mini-sent-modal').css('display', 'block');

    var settings = {
        "url": "/find/miniSent",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        const mailList = $('.sent-mail-list');
        mailList.empty(); // 기존 리스트 초기화

        if (response.length === 0) {
            const emptyMessage = $('<span></span>').attr('id', 'emptyMessage').text('쪽지함이 비었습니다.');
            mailList.append(emptyMessage);
        } else {
            response.forEach(message => {
                const list = $('<li></li>');

                const mailRecipient = $('<span></span>').addClass('mail-recipient').text(message.recipient);
                const mailSubject = $('<span></span>').addClass('mail-subject').text(message.title) .attr('onclick', 'openDetailModal(' + message.code + ')');
                mailSubject.on('click', openDetailModal);

                const mailTime = $('<span></span>').addClass('mail-time').text(formatMailDate(message.regDate));

                list.append(mailRecipient, mailSubject, mailTime);
                mailList.append(list);
            });
        }
    }).fail(function (response) {
        alert("쪽지 가져오기에 실패했습니다.");
    });
}

function closeMiniSent() {
    $('#mini-sent-modal').css('display', 'none');
}

// 쪽지 상세보기
function openDetailModal(code) {
    $('#detail-container-modal').show();
    var settings = {
        "url": "/message/"+code,
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    };

    $.ajax(settings).done(function (response) {
        if (response === null) {
            location.href = "redirect:/";
        }
        else {
            // response 객체를 이용해 모달 내용을 업데이트
            $('#detail-title-span').text(response.title);
            $('.detail-date').text(response.formattedRegDate);
            $('#detail-content').val(response.content);
            $('#detailModalDeleteBtn').val(response.code);
        }
    })
}

function closeDetailModal() {
    $('#detail-container-modal').hide();
    if(window.location.pathname === "/sent" || window.location.pathname === "/inbox") {
        location.reload();
    }
}

$(document).ready(() => {
    $('#detailModalCloseBtn').click(function() {
        $('#detail-myModal').hide();
    });

    window.openDeleteModal = function() {
        $('#detail-myModal').show();
    }

    $('#detailModalDeleteBtn').click(function() {
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
            if (response.status === 200) {
                $('#detail-container-modal').hide();
                $('#detail-myModal').hide();
                // window.history.back();
            }
        }).fail(function (response) {
            if (response.status === 400) {
                alert(response.message);
            }
        });
    });
});
