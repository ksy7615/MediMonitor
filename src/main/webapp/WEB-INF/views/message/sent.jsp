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
            <span class="mailbox-read-unread" id="mailbox-read-unread">읽지 않은 쪽지 [6] 통</span>
            <span class="mailbox-total" id="mailbox-total">전체 쪽지 [27] 통</span>
        </div>
        <div class="mailbox-messages" id="mailbox-messages">
            <c:forEach var="message" items="${messageList}" varStatus="status">
                <c:choose>
                    <c:when test="${message.status eq true}">
                        <div class="mailbox-message mailbox-read" id="mailbox-message-${status.count}">
                            <input type="checkbox" class="mailbox-checkbox" id="mailbox-checkbox-${status.count}">
                            <div class="mailbox-message-info">
                                <div class="mailbox-recipient" id="mailbox-recipient-${status.count}">${message.recipient}</div>
                                <div class="mailbox-title" id="mailbox-title-${status.count}"><a href="/message/${message.code}">${message.title}</a></div>
                                <div class="mailbox-date" id="mailbox-date-${status.count}" data-regdate="${message.regDate}"></div>
                            </div>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <div class="mailbox-message mailbox-unread" id="mailbox-message-${status.count}">
                            <input type="checkbox" class="mailbox-checkbox" id="mailbox-checkbox-${status.count}">
                            <div class="mailbox-message-info">
                                <div class="mailbox-recipient" id="mailbox-recipient-${status.count}">${message.recipient}</div>
                                <div class="mailbox-title" id="mailbox-title-${status.count}"><a href="/message/${message.code}">${message.title}</a></div>
                                <div class="mailbox-date" id="mailbox-date-${status.count}" data-regdate="${message.regDate}"></div>
                            </div>
                        </div>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/mailDateFormat.js"></script>
</html>
