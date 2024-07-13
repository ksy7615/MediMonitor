<%--
  Created by IntelliJ IDEA.
  User: hce
  Date: 2024-07-11
  Time: 오후 8:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notifications</title>
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<body>
    <h1>Notifications</h1>
    <div>Unread Notifications: <span id="notificationCount">0</span></div>
    <ul id="notifications" data-user-id="${username}"></ul>
    <button id="sendNotificationButton">Send Notification</button>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/notifications/notifications.js"></script>
</html>
