<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://use.fontawesome.com/releases/v6.0.0/js/all.js"></script>
    <link rel="icon" href="${pageContext.request.contextPath}/style/image/logo.png">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/module.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message/messageDetail.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Medimonitor</title>
</head>
<body id="header-body">
<header class="header">
    <div id="header-logo">
        <a class="header-logo-img" href="${pageContext.request.contextPath}/main"><img src="${pageContext.request.contextPath}/style/image/logo.png" width="40px" height="35px" alt="MEDIMONITOR"></a>
        <a class="header-logo-front" href="${pageContext.request.contextPath}/main">MEDI</a>
        <a class="header-logo-back" href="${pageContext.request.contextPath}/main">MONITOR</a>
    </div>
    <c:if test="${not empty user}">
        <div class="header-right">
            <div class="dropdown">
                <span class="icon" id="message-icon">
                    <i class="fas fa-comment-dots"></i>
                    <span class="notification-badge" id="notification-badge"></span>
                </span>
                <div class="dropdown-content" id="message-dropdown">
                    <a onclick="openMiniInbox(); markNotificationsAsReadAndClear()">받은 쪽지함</a>
                    <a onclick="openMiniSent()">보낸 쪽지함</a>
                    <a onclick="openMessageWriteModal()">쪽지 보내기</a>
                </div>
            </div>
            <div class="dropdown">
                <span class="icon" id="user-icon"><i class="fas fa-user"></i></span>
                <div class="dropdown-content" id="user-dropdown">
                    <a href="${pageContext.request.contextPath}/mypage">사용자 설정</a>
                    <c:if test="${user.userGroup eq 'admin'}">
                        <a href="${pageContext.request.contextPath}/admin">관리자 설정</a>
                    </c:if>
                    <a href="${pageContext.request.contextPath}/logout">로그아웃</a>
                </div>
            </div>
            <span class="admin-text"  id="user-text">${user.name}</span>
        </div>

        <input type="hidden" class="username"  id="username" value="${user.username}">
    </c:if>

    <div id="mini-sent-modal" class="message-modal">
        <div class="message-modal-content">
            <span class="mini-close" onclick="closeMiniSent()"><i class="fas fa-times"></i></span>
            <div id="message-modal-body">
                <h2>Message | 보낸 쪽지함</h2>
                <div class="mail-list-container">
                    <ul class="sent-mail-list">
                    </ul>
                </div>
                <button class="mail-button"><a href="${pageContext.request.contextPath}/sent">📮쪽지</a></button>
                <button class="mail-write" onclick="openMessageWriteModal()">✏️쪽지쓰기</button>
            </div>
        </div>
    </div>


    <div id="mini-inbox-modal" class="message-modal">
        <div class="message-modal-content">
            <span class="mini-close" onclick="closeMiniInbox()"><i class="fas fa-times"></i></span>
            <div id="inbox-message-modal-body">
                <h2>Message | 받은 쪽지함</h2>
                <div class="mail-list-container">
                    <ul class="inbox-mail-list">
                    </ul>
                </div>
                <button class="mail-button"><a href="${pageContext.request.contextPath}/inbox">📮쪽지</a></button>
                <button class="mail-write" onclick="openMessageWriteModal()">✏️쪽지쓰기</button>
            </div>
        </div>
    </div>


    <div id="userModal" class="find-user-modal">
        <div class="find-user-modal-content">
            <span class="find-user-close" onclick="closeUserModal()">&times;</span>
            <h2>아이디 검색</h2>
            <input type="text" id="searchName" placeholder="이름을 입력하세요">
            <button type="button" id="find-user-button" onclick="searchUser()">검색</button>
            <div id="searchResults"></div>
        </div>
    </div>


    <div id="messageWrite-modal" class="messageWrite-message-modal">
        <div class="messageWrite-message-modal-content">
            <span class="messageWrite-close" onclick="closeMessageWriteModal()"><i class="fas fa-times"></i></span>
            <h1>쪽지 보내기</h1>
            <form>
                <div class="messageWrite-form-group">
                    <label for="sender">보내는 사람</label>
                    <input type="text" id="sender" name="sender" value="${user.username}" readonly>
                </div>
                <div class="messageWrite-form-group">
                    <label for="recipient">받는 사람</label>
                    <input type="text" id="recipient" name="recipient" placeholder="아이디를 입력하세요.">
                    <button type="button" class="messageWrite-user-list" onclick="findUserModal()">아이디 검색</button>
                </div>
                <div class="messageWrite-form-group">
                    <label for="messageWrite-title">제목</label>
                    <input type="text" id="messageWrite-title" name="messageWrite-title" placeholder="제목을 입력하세요." maxlength="30">
                </div>
                <div class="char-count-container">
                    <span class="char-count">0/30</span>
                </div>
                <div class="messageWrite-form-group-textarea">
                    <textarea id="messageWrite-content" name="messageWrite-content" placeholder="쪽지 내용을 입력하세요" maxlength="500"></textarea>
                    <span class="char-count">0/500</span>
                </div>
                <div class="messageWrite-message-error-container">
                    <p class="error=msg" id="error-msg-sender">보내는 사람: 필수 정보입니다.</p>
                    <p class="error=msg" id="error-msg-sender-dupl">보내는 사람: 존재하지 않는 회원입니다.</p>
                    <p class="error=msg" id="error-msg-recipient">받는 사람: 필수 정보입니다.</p>
                    <p class="error=msg" id="error-msg-recipient-dupl">받는 사람: 존재하지 않는 회원입니다.</p>
                    <p class="error=msg" id="error-msg-title">제목: 필수 정보입니다.</p>
                    <p class="error=msg" id="error-msg-content">내용: 필수 정보입니다.</p>
                </div>
                <div class="messageWrite-button-group">
                    <button type="button" class="messageWrite-cancel" onclick="closeMessageWriteModal()">취소</button>
                    <button type="submit" class="messageWrite-send">쪽지보내기</button>
                </div>
            </form>
        </div>
    </div>


    <div id="notification-modal" class="notification-modal">
        <div class="notification-modal-content">
            <span class="notification-close" onclick="closeNotificationModal()"><i class="fas fa-times"></i></span>
            <p id="notification-message"></p>
        </div>
    </div>


    <div id="detail-container-modal" class="detail-modal">
        <div class="detail-container">
            <span class="detail-close" onclick="closeDetailModal()"><i class="fas fa-times"></i></span>
            <div class="detail-title">
                <span id="detail-title-span"></span>
                <span class="detail-date"></span>
                <span class="trash" onclick="openDeleteModal()"><i class="fa-regular fa-trash-can fa-2xl" style="color: #ffffff;"></i></span>
            </div>
            <div class="detail-content">
                <textarea id="detail-content" readonly></textarea>
            </div>
        </div>
    </div>


    <div id="detail-myModal" class="detail-modal">
        <div class="detail-modal-content">
            <p>삭제 하시겠습니까?</p>
            <div id="detail-button">
                <button id="detailModalDeleteBtn">예</button>
                <button id="detailModalCloseBtn">아니오</button>
            </div>
        </div>
    </div>


</header>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/header.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/messageModal.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/findUsername.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/notifications/messageNotifications.js"></script>

</html>