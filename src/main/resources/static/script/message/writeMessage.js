function openMessageWriteModal() {
    document.getElementById('messageWrite-modal').style.display = 'block';
}

function closeMessageWriteModal() {
    document.getElementById('messageWrite-modal').style.display = 'none';

    document.getElementById('error-msg-sender').style.display = 'none';
    document.getElementById('error-msg-sender-dupl').style.display = 'none';
    document.getElementById('sender').style.border = 'solid 1px lightgrey';

    document.getElementById('error-msg-recipient').style.display = 'none';
    document.getElementById('error-msg-recipient-dupl').style.display = 'none';
    document.getElementById('recipient').style.border = 'solid 1px lightgrey';

    document.getElementById('error-msg-title').style.display = 'none';
    document.getElementById('messageWrite-title').style.border = 'solid 1px lightgrey';

    document.getElementById('error-msg-content').style.display = 'none';
    document.getElementById('messageWrite-content').style.border = 'solid 1px lightgrey';
}

document.addEventListener('DOMContentLoaded', () => {
    // 제목 글자 수 세기
    const titleInput = document.getElementById('messageWrite-title');
    const titleCharCount = document.querySelector('.char-count-container .char-count');

    titleInput.addEventListener('input', () => {
        titleCharCount.textContent = `${titleInput.value.length}/30`;
    });

    // 내용 글자 수 세기
    const contentInput = document.getElementById('messageWrite-content');
    const contentCharCount = document.querySelector('.messageWrite-form-group-textarea .char-count');

    contentInput.addEventListener('input', () => {
        contentCharCount.textContent = `${contentInput.value.length}/500`;
    });

    document.getElementById('sender').addEventListener('focusout', (e) => {
        const sender = document.getElementById('sender');
        const errorMsgSender = document.getElementById('error-msg-sender');
        const errorMsgSenderDupl = document.getElementById('error-msg-sender-dupl');

        if (sender.value === "") {
            errorMsgSender.style.display = 'block';
            sender.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgSender.style.display = 'none';
            sender.style.border = 'solid 1px lightgrey';

            fetch(`/check/username?username=${sender.value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    errorMsgSenderDupl.style.display = 'none';
                    sender.style.border = 'solid 1px lightgrey';
                } else {
                    errorMsgSenderDupl.style.display = 'block';
                    sender.style.border = 'solid 1px #ff3f3f';
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    });

    document.getElementById('recipient').addEventListener('focusout', (e) => {
        const recipient = document.getElementById('recipient');
        const errorMsgRecipient = document.getElementById('error-msg-recipient');
        const errorMsgRecipientDupl = document.getElementById('error-msg-recipient-dupl');

        if (recipient.value === "") {
            errorMsgRecipient.style.display = 'block';
            recipient.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgRecipient.style.display = 'none';
            recipient.style.border = 'solid 1px lightgrey';

            fetch(`/check/username?username=${recipient.value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    errorMsgRecipientDupl.style.display = 'none';
                    recipient.style.border = 'solid 1px lightgrey';
                } else {
                    errorMsgRecipientDupl.style.display = 'block';
                    recipient.style.border = 'solid 1px #ff3f3f';
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    });

    titleInput.addEventListener('focusout', (e) => {
        const errorMsgTitle = document.getElementById('error-msg-title');
        if (titleInput.value === "") {
            errorMsgTitle.style.display = 'block';
            titleInput.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgTitle.style.display = 'none';
            titleInput.style.border = 'solid 1px lightgrey';
        }
    });

    contentInput.addEventListener('focusout', (e) => {
        const errorMsgContent = document.getElementById('error-msg-content');
        if (contentInput.value === "") {
            errorMsgContent.style.display = 'block';
            contentInput.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgContent.style.display = 'none';
            contentInput.style.border = 'solid 1px lightgrey';
        }
    });

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const sender = document.getElementById('sender').value;
        const recipient = document.getElementById('recipient').value;
        const title = titleInput.value;
        const content = contentInput.value;

        let isValid = true;

        if (sender === "") {
            isValid = false;
            document.getElementById('error-msg-sender').style.display = 'block';
            document.getElementById('sender').style.border = 'solid 1px #ff3f3f';
        }
        if (recipient === "") {
            isValid = false;
            document.getElementById('error-msg-recipient').style.display = 'block';
            document.getElementById('recipient').style.border = 'solid 1px #ff3f3f';
        }
        if (title === "" || title.length > 30) {
            isValid = false;
            document.getElementById('error-msg-title').style.display = 'block';
            titleInput.style.border = 'solid 1px #ff3f3f';
        }
        if (content === "" || content.length > 500) {
            isValid = false;
            document.getElementById('error-msg-content').style.display = 'block';
            contentInput.style.border = 'solid 1px #ff3f3f';
        }

        if (isValid) {
            fetch('/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: sender,
                    recipient: recipient,
                    title: title,
                    content: content
                })
            }).then(response => response.json())
                .then(response => {
                    if (response.status === 200) {
                        alert(response.message);
                        document.getElementById('recipient').value = '';
                        titleInput.value = '';
                        contentInput.value = '';
                        titleCharCount.textContent = '0/30';
                        contentCharCount.textContent = '0/500';
                    } else {
                        alert(response.message);
                    }
                }).catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
