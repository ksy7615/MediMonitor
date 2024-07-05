<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="${pageContext.request.contextPath}/style/image/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/module.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
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
                <span class="icon" id="message-icon"><i class="fas fa-comment-dots"></i></span>
                <div class="dropdown-content" id="message-dropdown">
                    <a onclick="openMiniInbox()">받은 쪽지함</a>
                    <a onclick="openMiniSent()">보낸 쪽지함</a>
                    <a href="${pageContext.request.contextPath}/write">쪽지 보내기</a>
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
    </c:if>

    <!-- 보낸 메일함 -->
    <div id="mini-inbox-modal" class="message-modal">
        <div class="message-modal-content">
            <span class="close" onclick="closeMiniInbox()"><i class="fas fa-times"></i></span>
            <div id="message-modal-body">
                <h2>Message | 보낸 메일함</h2>
                <div class="mail-list-container">
                    <ul class="mail-list">
                    </ul>
                </div>
                <button class="mail-button"><a href="${pageContext.request.contextPath}/sent">📮쪽지</a></button>
                <button class="mail-write"><a href="${pageContext.request.contextPath}/write">✏️쪽지쓰기</a></button>
            </div>
        </div>
    </div>


    <!-- 받은 메일함 -->
    <div id="mini-sent-modal" class="message-modal">
        <div class="message-modal-content">
            <span class="close" onclick="closeMiniSent()"><i class="fas fa-times"></i></span>
            <div id="sent-message-modal-body">
                <h2>Message | 받은 메일함</h2>
                <div class="mail-list-container">
                    <ul class="mail-list">
                    </ul>
                </div>
                <button class="mail-button"><a href="${pageContext.request.contextPath}/inbox">📮쪽지</a></button>
                <button class="mail-write"><a href="${pageContext.request.contextPath}/write">✏️쪽지쓰기</a></button>
            </div>
        </div>
    </div>
</header>

</body>
<script src="${pageContext.request.contextPath}/script/header.js"></script>
<script src="${pageContext.request.contextPath}/script/messageModal.js"></script>

</html>