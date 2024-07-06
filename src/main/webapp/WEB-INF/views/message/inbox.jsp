<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <c:import url="/header" />
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<body>
<div class="mailbox-container">
    <div class="mailbox-main-content" id="mailbox-main-content">
        <div class="mailbox-header" id="mailbox-header">
            <span id="mailbox-header-title">받은 쪽지함</span>
            <span class="mailbox-read-unread" id="mailbox-read-unread">읽지 않은 쪽지 [6] 통</span>
            <span class="mailbox-total" id="mailbox-total">전체 쪽지 [27] 통</span>
        </div>
        <div class="mailbox-messages" id="mailbox-messages">
            <c:forEach var="message" items="${messageList}" varStatus="status">
                <div class="mailbox-message mailbox-read" id="mailbox-message-${status.count}">
                    <input type="checkbox" class="mailbox-checkbox" id="mailbox-checkbox-${status.count}">
                    <div class="mailbox-message-info">
                        <div class="mailbox-sender" id="mailbox-sender-${status.count}">${message.sender}</div>
                        <div class="mailbox-title" id="mailbox-title-${status.count}"><a href="/detail/${message.code}">${message.title}</a></div>
                        <div class="mailbox-date" id="mailbox-date-${status.count}">${message.regDate}</div>
                    </div>
                </div>
            </c:forEach>
        </div>
        <div class="mailbox-footer" id="mailbox-footer">
            <button class="mailbox-footer-button" id="mailbox-select-all">전체선택</button>
            <button class="mailbox-footer-button" id="mailbox-delete-selected">선택삭제</button>
            <button class="mailbox-footer-button" id="mailbox-archive-selected">선택보관</button>
            <select class="mailbox-footer-select" id="mailbox-select-sender">
                <option value="sender">보낸 사람</option>
            </select>
            <input type="text" class="mailbox-footer-input" id="mailbox-search-input" placeholder="검색">
            <button class="mailbox-footer-button" id="mailbox-search-button">검색</button>
        </div>
    </div>
</div>
</body>
</html>
