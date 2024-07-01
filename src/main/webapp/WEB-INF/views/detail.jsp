<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>MEDIMONITOR</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/detail.css">
    <c:import url="/header" />
</head>
<body>
<div class="container">
    <div class="left-panel">
        <!-- 왼쪽 패널 -->
        <button class="thumbnail-btn" onclick="toggleBox()">Toggle Box</button>
    </div>


    <div class="top-panel" id="top-panel">
        <!-- 상단 패널 -->
    </div>

    <div class="toggle-box" id="toggle-box">
        <!-- 오른쪽에 나타날 네모칸 -->
    </div>

    <div class="main-panel" id="main-panel">
<%--        <div class="top-left">--%>
<%--            <!-- 상단 왼쪽 -->--%>
<%--        </div>--%>
<%--        <div class="top-right">--%>
<%--            <!-- 상단 오른쪽 -->--%>
<%--        </div>--%>
<%--        <div class="bottom-left">--%>
<%--            <!-- 하단 왼쪽 -->--%>
<%--        </div>--%>
<%--        <div class="bottom-right">--%>
<%--            <!-- 하단 오른쪽 -->--%>
<%--        </div>--%>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/script/detail.js"></script>

</body>
</html>
