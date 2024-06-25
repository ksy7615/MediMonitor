<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/calendar.css">
    <title>Title</title>
</head>
<body>
<div class="wrapper">
    <header>
        <div class="nav">
            <button class="material-icons" id="prev">chevron_left</button>
            <p class="current-date"></p>
            <button class="material-icons" id="next">chevron_right</button>
        </div>
    </header>
    <div class="calendar">
        <ul class="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
        </ul>
        <ul class="days"></ul>
    </div>
</div>
<div class="date-select">
    <input type="date" class="date-start" value="1990-01-01"/>
    <span> To </span>
    <input type="date" class="date-end" value="2024-06-24"/>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/calendar.js"></script>
</body>
</html>
