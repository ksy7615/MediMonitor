$(document).ready(() => {
    $('#new-password').focusout(e => {
        if($('#new-password').val() !== ""){
            const password = $('#new-password').val();

            if(password.match(/(?=.*[a-z])[a-z0-9]{8,12}/) === null || password.match(/(?=.*[a-z])[a-z0-9]{8,12}/)[0] !== password) {
                $('#error-msg-new-password-pattern').show();
                $('#new-password').css('border', 'solid 1px #ff3f3f');
            }else {
                $('#error-msg-new-password-pattern').hide();
            }
        }
    });

    $('#telecom').focusout(e => {
        if($('#telecom').val() === null){
            $('#error-msg-telecom').show();
            $('#telecom').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-telecom').hide();
            $('#telecom').css('border', 'solid 1px lightgrey');
            $('#telecom').css('border-bottom', 'none');
        }
    });

    $('#phone').focusout(e => {
        if($('#phone').val() === ""){
            $('#error-msg-phone').show();
            $('#phone').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-phone').hide();
            $('#phone').css('border', 'solid 1px lightgrey');

            const phone = $('#phone').val();

            if(phone.match(/\d{3}-\d{4}-\d{4}|\d{11}/) === null) {
                $('#error-msg-phone-pattern').show();
                $('#phone').css('border', 'solid 1px #ff3f3f');
            } else {
                if(phone.length === 11) {
                    const update = `${phone.substr(0,3)}-${phone.substr(3,4)}-${phone.substr(7,4)}`;
                    $('#phone').val(update);
                    $('#error-msg-phone-pattern').hide();
                }
            }
        }
    });

    $('#address').focusout(e => {
        if($('#address').val() === ""){
            $('#error-msg-address').show();
            $('#address').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-address').hide();
            $('#address').css('border', 'solid 1px lightgrey');
            $('#address').css('border-bottom', 'none');
        }
    });

    $('#department').focusout(e => {
        if($('#department').val() === ""){
            $('#error-msg-department').show();
            $('#department').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-department').hide();
            $('#department').css('border', 'solid 1px lightgrey');
            $('#department').css('border-bottom', 'none');
        }
    });

    $('#userGroup').focusout(e => {
        if($('#userGroup').val() === null){
            $('#error-msg-userGroup').show();
            $('#userGroup').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-userGroup').hide();
            $('#userGroup').css('border', 'solid 1px lightgrey');
            $('#userGroup').css('border-bottom', 'none');
        }
    });

    $('#position').focusout(e => {
        if($('#position').val() === null){
            $('#error-msg-position').show();
            $('#position').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-position').hide();
            $('#position').css('border', 'solid 1px lightgrey');
            $('#position').css('border-bottom', 'none');
        }
    });

    $('form').submit(e => {
        e.preventDefault();

        const newPassword = $('#new-password').val();
        const telecom = $('#telecom').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const department = $('#department').val();
        const userGroup = $('#userGroup').val();
        const position = $('#position').val();

        let isValid = true;

        if(telecom === null){
            isValid = false;
            $('#error-msg-telecom').show();
            $('#telecom').css('border', 'solid 1px #ff3f3f');
        }
        if(phone === ""){
            isValid = false;
            $('#error-msg-phone').show();
            $('#phone').css('border', 'solid 1px #ff3f3f');
        }
        if(address === ""){
            isValid = false;
            $('#error-msg-address').show();
            $('#address').css('border', 'solid 1px #ff3f3f');
        }
        if(department === ""){
            isValid = false;
            $('#error-msg-department').show();
            $('#department').css('border', 'solid 1px #ff3f3f');
        }
        if(userGroup === null){
            isValid = false;
            $('#error-msg-userGroup').show();
            $('#userGroup').css('border', 'solid 1px #ff3f3f');
        }
        if(position === null){
            isValid = false;
            $('#error-msg-position').show();
            $('#position').css('border', 'solid 1px #ff3f3f');
        }

        if(isValid) {
            var settings = {
                "url": "/update",
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "newPassword": newPassword,
                    "telecom": telecom,
                    "phone": phone,
                    "address": address,
                    "department": department,
                    "userGroup": userGroup,
                    "position": position
                }),
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    alert(response.message);
                    location.href = "/mypage";
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    alert(response.responseJSON.message);
                    location.href = "/update";
                }
            });
        }
    });
});
