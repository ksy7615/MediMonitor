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
        <button class="thumbnail-btn" id="thumbnail-btn" onclick="toggleBox()"><img
                src="${pageContext.request.contextPath}/style/image/icon_thumbnail.png" alt=""></button>
        <label>썸네일</label>
        <button class="report-btn" onclick="showModal()"><img
                src="${pageContext.request.contextPath}/style/image/icon_report.png" alt=""></button>
        <label>리포트</label>
    </div>


    <!-- 상단 패널: 툴바 -->
    <div class="top-panel" id="top-panel">

        <!-- 3개는 구현해야하는것 -->
        <button id="WorkList-tool-btn">Work List</button>
        <button id="Previous-tool-btn">Previous</button>
        <button id="Next-tool-btn">Next</button>

        <button id="StackScroll-tool-btn">StackScroll Tool</button>
        <button id="Window-level-tool-btn">Window Level Tool</button>
        <button id="Invert-tool-btn">Invert Tool</button>
        <button id="Pan-tool-btn">Pan Tool</button>
        <button id="scroll-loop-btn">Scroll Loop</button>

        <!-- 플레이 클립 수정필요 -->
        <button id="Playclip-tool-btn">Playclip</button>
        <button id="StopPlayclip-tool-btn">Stopclip</button>

        <!-- 여기서 부터 도구툴 -->
        <button id="Magnify-tool-btn">Magnify Tool</button>
        <button id="Zoom-tool-btn">Zoom Tool</button>
        <button id="Rotate-tool-btn">Rotate Tool</button>
        <button id="RigthRotate-tool-btn">Rigth Rotate Tool</button>
        <button id="LeftRotate-tool-btn">Left Rotate Tool</button>
        <!-- 이름수정 -->
        <button id="WidthFlip-tool-btn">WidthFlip Tool</button>
        <button id="HeghtFlip-tool-btn">HeghtFlip Tool</button>


        <!-- 여기서 주석툴임 리스트로 묶을것 -->
        <button id="Length-tool-btn">Length Tool</button>
        <button id="Height-tool-btn">Height Tool</button>
        <button id="Probe-tool-btn">Probe Tool</button>
        <button id="RectangleROI-tool-btn">RectangleROI Tool</button>
        <button id="EllipticalIROI-tool-btn">EllipticalIROI Tool</button>
        <button id="CircleROI-tool-btn">CircleROI Tool</button>
        <button id="Bidirectional-tool-btn">Bidirectional Tool</button>
        <button id="Angle-tool-btn">Angle Tool</button>
        <button id="CobbAngle-tool-btn">CobbAngle Tool</button>
        <button id="ArrowAnnotate-tool-btn">ArrowAnnotate Tool</button>
        <button id="PlanarFreehandROI-tool-btn">PlanarFreehandROI Tool</button>
        <button id="Eraser-tool-btn">Eraser Tool</button>

        <!-- 리셋 -->
        <button id="Rest-tool-btn">Reset Tool</button>

        <!-- 그리드 -->
        <button id="grid-btn">Show Grid</button>
        <div class="grid-container" id="grid-container" style="display: none;">
            <div class="grid">
                <c:forEach var="row" begin="0" end="4">
                    <c:forEach var="col" begin="0" end="4">
                        <div class="grid-item" data-row="${row}" data-col="${col}"></div>
                    </c:forEach>
                </c:forEach>
            </div>
        </div>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/script/detail/dicom-render.js"></script> <!-- dicom-render.js를 추가 -->
</body>
</html>
