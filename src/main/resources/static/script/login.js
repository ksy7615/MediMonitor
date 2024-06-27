$(document).ready(() => {
    $('#username').focusout(e => {
        if($('#username').val() === ""){
            $('#error-msg-username').show();
            $('#username').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-username').hide();
            $('#username').css('border', 'solid 1px lightgrey');
        }
    });

    $('#password').focusout(e => {
        if($('#password').val() === ""){
            $('#error-msg-password').show();
            $('#password').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-password').hide();
            $('#password').css('border', 'solid 1px lightgrey');
        }
    });

    $('form').submit(e => {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        // 유효성 검사
        let isValid = true;

        if(username === "") {
            isValid = false;
            $('#error-msg-username').show();
            $('#username').css('border', 'solid 1px #ff3f3f');
        }
        if(password === ""){
            isValid = false;
            $('#error-msg-password').show();
            $('#password').css('border', 'solid 1px #ff3f3f');
        }

        if(isValid) {
            var settings = {
                "url": "/login",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "username": username,
                    "password": password
                }),
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    location.href = "/main";
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    $('#myModal').show();
                }
                else if(response.status === 404) {
                    alert(response.responseJSON.message);
                    location.href = "/login";
                }
            });
        }

    });

    // 모달창 닫기
    $('#modalCloseBtn').click(function() {
        $('#myModal').hide();
    });
});