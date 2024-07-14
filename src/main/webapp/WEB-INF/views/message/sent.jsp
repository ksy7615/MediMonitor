<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <c:import url="/header" />
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div class="mailbox-container">
    <div class="mailbox-main-content" id="mailbox-main-content">
        <div class="mailbox-header" id="mailbox-header">
            <span id="mailbox-header-title">보낸 쪽지함</span>
            <span class="mailbox-total" id="mailbox-total">전체 쪽지 [${messageCnt}] 통</span>
        </div>
        <div class="mailbox-messages" id="mailbox-messages">
            <c:forEach var="message" items="${messageList}" varStatus="status">
                <div class="mailbox-message mailbox-read" id="mailbox-message-${status.count}">
                    <input type="checkbox" class="mailbox-checkbox" id="mailbox-checkbox-${status.count}" data-code="${message.code}">
                    <div class="mailbox-message-info">
                        <div class="mailbox-recipient" id="mailbox-recipient-${status.count}">${message.recipient}</div>
                        <div class="mailbox-title" id="mailbox-title-${status.count}" onclick="openDetailModal(${message.code})">${message.title}</div>
                        <div class="mailbox-date" id="mailbox-date-${status.count}" data-regdate="${message.regDate}"></div>
                    </div>
                </div>
        </c:forEach>
    </div>

    <div class="mailbox-footer" id="mailbox-footer">
        <button class="mailbox-footer-button" id="mailbox-select-all">전체선택</button>
        <button class="mailbox-footer-button" id="mailbox-delete-selected" onclick="deleteButtonMenu()">선택삭제</button>
    </div>
</div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/mailDateFormat.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/messageBox.js"></script>
</html>
