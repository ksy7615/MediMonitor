$(document).ready(() => {
    $("#sender").focusout(e => {
        if($('#sender').val() === "") {
            $('#error-msg-sender').show();
            $('#sender').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-sender').hide();
            $('#sender').css('border', 'solid 1px lightgrey');

            var settings = {
                "url": "/check/username?username="+$('#sender').val(),
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    $('#error-msg-sender-dupl').hide();
                    $('#sender').css('border', 'solid 1px lightgrey');
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    $('#error-msg-sender-dupl').show();
                    $('#sender').css('border', 'solid 1px #ff3f3f');
                }
            });
        }
    })

    $("#recipient").focusout(e => {
        if($('#recipient').val() === "") {
            $('#error-msg-recipient').show();
            $('#recipient').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-recipient').hide();
            $('#recipient').css('border', 'solid 1px lightgrey');

            var settings = {
                "url": "/check/username?username="+$('#recipient').val(),
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    $('#error-msg-recipient-dupl').hide();
                    $('#recipient').css('border', 'solid 1px lightgrey');
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    $('#error-msg-recipient-dupl').show();
                    $('#recipient').css('border', 'solid 1px #ff3f3f');
                }
            });
        }
    })

    $("#title").focusout(e => {
        if ($('#title').val() === "") {
            $('#error-msg-title').show();
            $('#title').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-title').hide();
            $('#title').css('border', 'solid 1px lightgrey');
        }
    })


    $("#content").focusout(e => {
        if ($('#content').val() === "") {
            $('#error-msg-content').show();
            $('#content').css('border', 'solid 1px #ff3f3f');
        } else {
            $('#error-msg-content').hide();
            $('#content').css('border', 'solid 1px lightgrey');
        }
    })


    $('form').submit(e => {
        e.preventDefault();

        const sender = $('#sender').val();
        const recipient = $('#recipient').val();
        const title = $('#title').val();
        const content = $('#content').val();

        let isValid = true;

        if(sender === "") {
            isValid = false;
            $('#error-msg-sender').show();
            $('#sender').css('border', 'solid 1px #ff3f3f');
        }
        if(recipient === ""){
            isValid = false;
            $('#error-msg-recipient').show();
            $('#recipient').css('border', 'solid 1px #ff3f3f');
        }
        if(title === ""){
            isValid = false;
            $('#error-msg-title').show();
            $('#title').css('border', 'solid 1px #ff3f3f');
        }
        if(content === ""){
            isValid = false;
            $('#error-msg-content').show();
            $('#content').css('border', 'solid 1px #ff3f3f');
        }

        if(isValid) {
            var settings = {
                "url": "/write",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "sender": sender,
                    "recipient": recipient,
                    "title": title,
                    "content": content
                }),
            };

            $.ajax(settings).done(function (response) {
                if(response.status === 200) {
                    alert(response.message);
                    location.href = "/sent";
                }
            }).fail(function (response) {
                if(response.status === 400) {
                    alert(response.responseJSON.message);
                    location.href = "/write";
                }
            });
        }
    });
})