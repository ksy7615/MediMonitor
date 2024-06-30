<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/checkPassword.js"></script>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div id="login-main">
    <div id="login-logo">
        <img src="${pageContext.request.contextPath}/style/image/logo.png" alt="MEDIMONITOR">
        <span id="login-logo-front">MEDI</span>
        <span id="login-logo-back">MONITOR</span>
    </div>
    <div id="login-container">
        <form method="POST" action="${pageContext.request.contextPath}/login">
            <div>
                <input type="password" id="password" placeholder="비밀번호">
            </div>
            <div class="error-container">
                <p class="error=msg" id="error-msg-password">비밀번호: 필수 정보입니다.</p>
            </div>
            <button type="submit">확인</button>
        </form>
    </div>
</div>
<!-- 모달창 -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <p>승인 요청 처리 중입니다</p>
        <button id="modalCloseBtn">예</button>
    </div>
</div>
</body>
</html>
