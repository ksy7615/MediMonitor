// modal.js

function openMiniInbox() {
    document.getElementById('mini-inbox-modal').style.display = 'block';

    var settings = {
        "url": "/find/miniInbox",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        const mailList = document.querySelector('.mail-list');
        mailList.innerHTML = ''; // 기존 리스트 초기화

        if(response.length === 0) {
            const emptyMessage = document.createElement('span');
            emptyMessage.id = 'emptyMessage';
            emptyMessage.innerText = "쪽지함이 비었습니다.";
            mailList.append(emptyMessage);
        }else {
            for(let message of response) {
                const list = document.createElement('li');

                const mailSender = document.createElement('span');
                mailSender.className = 'mail-sender';
                mailSender.innerText = message.sender;
                const mailSubject = document.createElement('span');
                mailSubject.className = 'mail-subject';
                mailSubject.innerText = message.title;
                const mailTime = document.createElement('span');
                mailTime.className = 'mail-time';
                mailTime.innerText = message.regDate;

                list.append(mailSender);
                list.append(mailSubject);
                list.append(mailTime);

                mailList.append(list);
            }
        }
    }).fail(function (response) {
        alert("쪽지 가져오기에 실패했습니다.")
    });

}

function closeMiniInbox() {
    document.getElementById('mini-inbox-modal').style.display = 'none';
}

function openMiniSent() {
    document.getElementById('mini-inbox-modal').style.display = 'block';

    var settings = {
        "url": "/find/miniSent",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        const mailList = document.querySelector('.mail-list');
        mailList.innerHTML = ''; // 기존 리스트 초기화

        if(response.length === 0) {
            const emptyMessage = document.createElement('span');
            emptyMessage.id = 'emptyMessage';
            emptyMessage.innerText = "쪽지함이 비었습니다.";
            mailList.append(emptyMessage);
        }else {
            for(let message of response) {
                const list = document.createElement('li');

                const mailRecipient = document.createElement('span');
                mailRecipient.className = 'mail-recipient';
                mailRecipient.innerText = message.recipient;
                const mailSubject = document.createElement('span');
                mailSubject.className = 'mail-subject';
                mailSubject.innerText = message.title;
                const mailTime = document.createElement('span');
                mailTime.className = 'mail-time';
                mailTime.innerText = message.regDate;

                list.append(mailRecipient);
                list.append(mailSubject);
                list.append(mailTime);

                mailList.append(list);
            }
        }
    }).fail(function (response) {
        alert("쪽지 가져오기에 실패했습니다.")
    });

}

function closeMiniSent() {
    document.getElementById('mini-sent-modal').style.display = 'none';
}
