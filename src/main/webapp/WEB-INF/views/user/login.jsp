<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
</head>
<body>
<div id="login-main">
    <div id="login-logo">
        <span id="login-logo-front"><img src="${pageContext.request.contextPath}/style/image/logo.png" width="120px" height="90px" alt="MEDIMONITOR">MEDI</span>
        <span id="login-logo-back">MONITOR</span>
    </div>
    <div id="login-container">
        <form>
            <input type="text" placeholder="아이디">
            <input type="password" placeholder="비밀번호">
            <button type="submit">로그인</button>
        </form>
        <a href="${pageContext.request.contextPath}/join">회원가입</a>
    </div>
</div>

</body>
</html>
