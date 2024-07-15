$(document).ready(() => {
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

        const password = $('#password').val();

        let isValid = true;
        if(password === ""){
            isValid = false;
            $('#error-msg-password').show();
            $('#password').css('border', 'solid 1px #ff3f3f');
        }

        if(isValid) {
            var settings = {
                "url": "/check/password",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "password": password
                }),
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    location.href = "/update";
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    alert(response.responseJSON.message)
                    location.href = "/check";
                }
            });
        }

    });

    $('#modalCloseBtn').click(function() {
        $('#myModal').hide();
    });
});