$(document).ready(() => {
    $('#username').focusout(e => {
        if($('#username').val() === ""){
            $('#error-msg-id').show();
            $('#username').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-id').hide();
            $('#username').css('border', 'solid 1px lightgrey');

            var settings = {
                "url": "/check/username?username="+$('#username').val(),
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    $('#error-msg-id-dupl').show();
                    $('#username').css('border', 'solid 1px #ff3f3f');
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    $('#error-msg-id-dupl').hide();
                    $('#username').css('border', 'solid 1px lightgrey');
                }
            });
        }
    });

    $('#password').focusout(e => {
        if($('#password').val() === ""){
            $('#error-msg-password').show();
            $('#password').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-password').hide();
            $('#password').css('border', 'solid 1px lightgrey');

            const password = $('#password').val();

            if(password.match(/(?=.*[a-z])[a-z0-9]{8,12}/) === null || password.match(/(?=.*[a-z])[a-z0-9]{8,12}/)[0] !== password) {
                $('#error-msg-password-pattern').show();
                $('#password').css('border', 'solid 1px #ff3f3f');
            }else {
                $('#error-msg-password-pattern').hide();
            }
        }
    });

    $('#name').focusout(e => {
        if($('#name').val() === ""){
            $('#error-msg-name').show();
            $('#name').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-name').hide();
            $('#name').css('border', 'solid 1px lightgrey');
            $('#name').css('border-bottom', 'none');
        }
    });

    $('#birth').focusout(e => {
        console.log($('#birth').val());
        if($('#birth').val() === ""){
            $('#error-msg-birth').show();
            $('#birth').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-birth').hide();
            $('#birth').css('border', 'solid 1px lightgrey');
            $('#birth').css('border-bottom', 'none');

            const birth = $('#birth').val();

            if(birth.match(/\d{8}/) === null) {
                $('#error-msg-birth-pattern').show();
                $('#birth').css('border', 'solid 1px #ff3f3f');
            }else {
                $('#error-msg-birth-pattern').hide();
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
                } else if(phone.match(/\d{3}-\d{4}-\d{4}|\d{11}/) !== null) {
                    $('#error-msg-phone-pattern').hide();
                }

                var settings = {
                    "url": "/check/phone?phone="+$('#phone').val(),
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                };

                $.ajax(settings).done(function (response) {
                    if(response.status === 200) {
                        $('#error-msg-phone-dupl').show();
                        $('#phone').css('border', 'solid 1px #ff3f3f');
                    }
                }).fail(function (response) {
                    if(response.status === 400) {
                        $('#error-msg-phone-dupl').hide();
                        $('#phone').css('border', 'solid 1px lightgrey');
                    }
                });
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
        if($('#department').val() === null){
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

        const username = $('#username').val();
        const password = $('#password').val();
        const name = $('#name').val();
        const birth = $('#birth').val();
        const telecom = $('#telecom').val();
        const phone = $('#phone').val();
        const address = $('#address').val();
        const department = $('#department').val();
        const userGroup = $('#userGroup').val();
        const position = $('#position').val();

        let isValid = true;

        if(username === "") {
            isValid = false;
            $('#error-msg-id').show();
            $('#username').css('border', 'solid 1px #ff3f3f');
        }
        if(password === ""){
            isValid = false;
            $('#error-msg-password').show();
            $('#password').css('border', 'solid 1px #ff3f3f');
        }
        if(name === ""){
            isValid = false;
            $('#error-msg-name').show();
            $('#name').css('border', 'solid 1px #ff3f3f');
        }
        if(birth === ""){
            isValid = false;
            $('#error-msg-birth').show();
            $('#birth').css('border', 'solid 1px #ff3f3f');
        }
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
        if(department === null){
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
                "url": "/join",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "username": username,
                    "password": password,
                    "name": name,
                    "telecom": telecom,
                    "phone": phone,
                    "birth": birth,
                    "address": address,
                    "department": department,
                    "userGroup": userGroup,
                    "position": position
                }),
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    const params = new URLSearchParams({
                        name: name,
                        phone: phone,
                        birth: birth,
                        department: department,
                        address: address,
                        position: position
                    }).toString();
                    location.href = "/agree?" + params;
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    alert(response.responseJSON.message);
                    location.href = "/join";
                }
            });
        }
    });
});
