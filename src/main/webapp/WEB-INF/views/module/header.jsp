<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="${pageContext.request.contextPath}/style/image/logo.png">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/module.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Medimonitor</title>
</head>
<body id="header-body">
<header class="header">
    <div id="header-logo">
        <img src="${pageContext.request.contextPath}/style/image/logo.png" width="40px" height="35px" alt="MEDIMONITOR">
        <span id="header-logo-front">MEDI</span>
        <span id="header-logo-back">MONITOR</span>
    </div>
    <c:if test="${not empty user}">
        <div class="header-right">
            <div class="dropdown">
                <span class="icon" id="message-icon"><i class="fas fa-comment-dots"></i></span>
                <div class="dropdown-content" id="message-dropdown">
                    <a href="#">받은 쪽지함</a>
                    <a href="#">보낸 쪽지함</a>
                    <a href="#">쪽지 보내기</a>
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
            <span class="admin-text">${user.name}</span>
        </div>
    </c:if>
</header>
<script src="${pageContext.request.contextPath}/script/header.js"></script>
</body>

</html>