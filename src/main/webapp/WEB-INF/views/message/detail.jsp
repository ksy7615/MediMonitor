<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <c:import url="/header" />
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<body>
<div class="detail-container">
    <div class="detail-header">
        <div class="detail-header-left">
            <button class="detail-button">삭제</button>
        </div>
        <div class="detail-header-right">
            <button class="detail-button">목록</button>
        </div>
    </div>
    <div class="detail-title">
        <span>${message.title}</span>
        <span class="detail-date">${message.regDate}</span>
    </div>
    <div class="detail-content">
        <p>${message.content}</p>
    </div>
</div>
</body>
</html>
