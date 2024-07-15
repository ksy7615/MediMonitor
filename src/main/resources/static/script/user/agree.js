$(document).ready(() => {
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
            }
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

    $('#position').focusout(e => {
        if($('#position').val() === ""){
            $('#error-msg-position').show();
            $('#position').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-position').hide();
            $('#position').css('border', 'solid 1px lightgrey');
            $('#position').css('border-bottom', 'none');
        }
    });

    $('#provider').focusout(e => {
        if($('#provider').val() === ""){
            $('#error-msg-provider').show();
            $('#provider').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-provider').hide();
            $('#provider').css('border', 'solid 1px lightgrey');
            $('#provider').css('border-bottom', 'none');
        }
    });

    $('#consent-content').focusout(e => {
        if($('#consent-content').val() === ""){
            $('#error-msg-consent-content').show();
            $('#consent-content').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-consent-content').hide();
            $('#consent-content').css('border', 'solid 1px lightgrey');
            $('#consent-content').css('border-bottom', 'none');
        }
    });

    $('#purpose').focusout(e => {
        if($('#purpose').val() === ""){
            $('#error-msg-purpose').show();
            $('#purpose').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-purpose').hide();
            $('#purpose').css('border', 'solid 1px lightgrey');
            $('#purpose').css('border-bottom', 'none');
        }
    });

    $('#duration').focusout(e => {
        if($('#duration').val() === ""){
            $('#error-msg-duration').show();
            $('#duration').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-duration').hide();
            $('#duration').css('border', 'solid 1px lightgrey');
            $('#duration').css('border-bottom', 'none');
        }
    });

    $('form').submit(e => {
        e.preventDefault();

        const name = $('#name').val();
        const phone = $('#phone').val();
        const birth = $('#birth').val();
        const department = $('#department').val();
        const address = $('#address').val();
        const position = $('#position').val();
        const provider = $('#provider').val();
        const consentContent = $('#consentContent').val();
        const purpose = $('#purpose').val();
        const duration = $('#duration').val();

        let isValid = true;

        if(name === ""){
            isValid = false;
            $('#error-msg-name').show();
            $('#name').css('border', 'solid 1px #ff3f3f');
        }
        if(phone === ""){
            isValid = false;
            $('#error-msg-phone').show();
            $('#phone').css('border', 'solid 1px #ff3f3f');
        }
        if(birth === ""){
            isValid = false;
            $('#error-msg-birth').show();
            $('#birth').css('border', 'solid 1px #ff3f3f');
        }
        if(department === ""){
            isValid = false;
            $('#error-msg-department').show();
            $('#department').css('border', 'solid 1px #ff3f3f');
        }
        if(address === ""){
            isValid = false;
            $('#error-msg-address').show();
            $('#address').css('border', 'solid 1px #ff3f3f');
        }
        if(position === ""){
            isValid = false;
            $('#error-msg-position').show();
            $('#position').css('border', 'solid 1px #ff3f3f');
        }
        if(provider === ""){
            isValid = false;
            $('#error-msg-provider').show();
            $('#birth').css('border', 'solid 1px #ff3f3f');
        }
        if(consentContent === ""){
            isValid = false;
            $('#error-msg-consent-content').show();
            $('#consent-content').css('border', 'solid 1px #ff3f3f');
        }
        if(purpose === ""){
            isValid = false;
            $('#error-msg-purpose').show();
            $('#address').css('border', 'solid 1px #ff3f3f');
        }
        if(duration === ""){
            isValid = false;
            $('#error-msg-duration').show();
            $('#position').css('border', 'solid 1px #ff3f3f');
        }
        if (!$('input[name="consent"]:checked').val()) {
            isValid = false;
        }
        if (!$('input[name="awareness"]:checked').val()) {
            isValid = false;
        }
        if ($('input[name="consent"]:checked').val() === "disagree") {
            isValid = false;
            alert("동의하지 않음으로 선택하셨습니다. 동의가 필요합니다.");
        }
        if ($('input[name="awareness"]:checked').val() === "no") {
            isValid = false;
            alert("아니오로 선택하셨습니다. 개인정보 보호법 동의가 필요합니다.");
        }

        if(isValid){
            alert("회원가입에 성공하였습니다.");
            location.href = "/"
        } else {
            alert("필수정보를 입력해주세요.");
        }
    });
});
