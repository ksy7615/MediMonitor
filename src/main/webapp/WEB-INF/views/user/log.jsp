<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>접근 기록 확인</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/log.css">
    <c:import url="/header" />
</head>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div class="log-info">
    <input type="hidden" id="username" value="${user.username}">
    <h1>접근 기록 확인</h1>
    <table class="log-table" id="log-table">
        <thead>
        <tr>
            <th>Code</th>
            <th>Study Key</th>
            <th>ID</th>
            <th>접근일시</th>
        </tr>
        </thead>
        <tbody class="contentBody">
        </tbody>
    </table>
    <div class="button-set">
        <button class="button blue-button" id="left">◀</button>
        <label id="pageCnt"></label>
        <button class="button blue-button" id="right">▶</button>
    </div>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/log.js"></script>
</html>