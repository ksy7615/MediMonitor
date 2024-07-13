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

    document.getElementById('messageWrite-title').addEventListener('focusout', (e) => {
        const title = document.getElementById('messageWrite-title');
        const errorMsgTitle = document.getElementById('error-msg-title');

        if (title.value === "") {
            errorMsgTitle.style.display = 'block';
            title.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgTitle.style.display = 'none';
            title.style.border = 'solid 1px lightgrey';
        }
    });

    document.getElementById('messageWrite-content').addEventListener('focusout', (e) => {
        const content = document.getElementById('messageWrite-content');
        const errorMsgContent = document.getElementById('error-msg-content');

        if (content.value === "") {
            errorMsgContent.style.display = 'block';
            content.style.border = 'solid 1px #ff3f3f';
        } else {
            errorMsgContent.style.display = 'none';
            content.style.border = 'solid 1px lightgrey';
        }
    });

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const sender = document.getElementById('sender').value;
        const recipient = document.getElementById('recipient').value;
        const title = document.getElementById('messageWrite-title').value;
        const content = document.getElementById('messageWrite-content').value;

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
        if (title === "") {
            isValid = false;
            document.getElementById('error-msg-title').style.display = 'block';
            document.getElementById('messageWrite-title').style.border = 'solid 1px #ff3f3f';
        }
        if (content === "") {
            isValid = false;
            document.getElementById('error-msg-content').style.display = 'block';
            document.getElementById('messageWrite-content').style.border = 'solid 1px #ff3f3f';
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
                        document.getElementById('messageWrite-title').value = '';
                        document.getElementById('messageWrite-content').value = '';
                    } else {
                        alert(response.message);
                    }
                }).catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
