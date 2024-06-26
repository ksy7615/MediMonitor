<%--
  Created by IntelliJ IDEA.
  User: hce
  Date: 2024-06-26
  Time: 오후 4:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
</head>
<body>
<div id="login-container">
    <span id="login-logo"><img src="${pageContext.request.contextPath}/style/image/logo.png" width="120px" height="90px" alt="MEDIMONITOR">MEDI</span>
    <span id="login-logo-back">MONITOR</span>
    <form>
        <input type="text" placeholder="아이디">
        <input type="password" placeholder="비밀번호">
        <button type="submit">로그인</button>
    </form>
    <a href="${pageContext.request.contextPath}/join">회원가입</a>
</div>
</body>
</html>
