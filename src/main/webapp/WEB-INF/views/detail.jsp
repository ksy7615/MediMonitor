<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>MEDIMONITOR</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/detail.css">
    <c:import url="/header"/>
</head>
<body>

<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>

<div class="container">
    <div class="left-panel">
        <!-- 왼쪽 패널 -->
        <button class="thumbnail-btn" onclick="toggleBox()"><img
                src="${pageContext.request.contextPath}/style/image/icon_thumbnail.png" alt=""></button>
        <label>썸네일</label>
        <button class="report-btn" onclick="showModal()"><img
                src="${pageContext.request.contextPath}/style/image/icon_report.png" alt=""></button>
        <label>리포트</label>
    </div>


    <div class="top-panel" id="top-panel">
        <!-- 상단 패널 -->
    </div>

    <div class="toggle-box" id="toggle-box">
        <!-- 오른쪽에 나타날 네모칸 -->
    </div>

    <div class="content" id="content">

    </div>
</div>

<!-- 모달 창 -->
<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <div class="modal-header">

        </div>
        <div class="modal-body">
            <div class="write-box">
                <textarea class="comment" id='comment' placeholder="코멘트" ></textarea>
                <textarea class="quest" id='quest' placeholder="
[Finding]


[Conclusion]


[Recommend]

" ></textarea>
            </div>
            <div class="analysis">
                <label>판독 일시</label>
                <input class="inputText" type="text" id="studyDate" disabled><br>
                <label>예비판독의</label>
                <input class="inputText" type="text" id="preDoctor" disabled><br>
                <label>판독의1</label>
                <input class="inputText" type="text" id="firstDoctor" disabled><br>
                <label>판독의2</label>
                <input class="inputText" type="text" id="secondDoctor" disabled><br>
                <input type="hidden" id="username" value=${user.username}>
                <div class="buttons">
                    <button class="button blue-button" id="btn-reading">판독</button>
                    <button class="button" id="btn-pre-reading">예비판독</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/dist/bundle.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/detail/detail_report.js"></script>
<%--<script type="module" src="${pageContext.request.contextPath}/script/detail/detail_thumbnail.js"></script>--%>
</body>
</html>
