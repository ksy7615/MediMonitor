<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <script src="https://use.fontawesome.com/releases/v6.0.0/js/all.js"></script>
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
        <span id="detail-title-span">${message.title}</span>
        <span class="detail-date">
            ${message.formattedRegDate}
        </span>
        <span class="trash" onclick="openDeleteModal()"><i class="fa-regular fa-trash-can fa-2xl" style="color: #ffffff;"></i></span>
    </div>
    <div class="detail-content">
        <p>${message.content}</p>
    </div>
</div>

<!-- 모달창 -->
<div id="detail-myModal" class="detail-modal">
    <div class="detail-modal-content">
        <p>삭제 하시겠습니까?</p>
        <div id="detail-button">
            <button id="detailModalDeleteBtn" value="${message.code}">예</button>
            <button id="detailModalCloseBtn">아니오</button>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/deleteMessage.js"></script>
</html>
