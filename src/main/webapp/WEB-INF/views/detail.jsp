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
        location.href = '/login';
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
        <button class="tool" id="WorkList-tool-btn">
            <img id="workList" src="${pageContext.request.contextPath}/style/image/tool/workList.png">
            <span>워크리스트</span>
        </button>

        <button class="tool" id="Previous-tool-btn">
            <img id="previous" src="${pageContext.request.contextPath}/style/image/tool/previous.png">
            <span>이전</span>
        </button>

        <button class="tool" id="Next-tool-btn">
            <img id="next" src="${pageContext.request.contextPath}/style/image/tool/next.png">
            <span>다음</span>
        </button>


        <button class="tool" id="StackScroll-tool-btn">
            <img id="defalut" src="${pageContext.request.contextPath}/style/image/tool/stackScroll.png">
            <span>DefalutTool</span>
        </button>

        <button class="tool" id="Window-level-tool-btn">
            <img id="windowLevel" src="${pageContext.request.contextPath}/style/image/tool/windowLevel.png">
            <span>윈도우레벨</span>
        </button>

        <button class="tool" id="Invert-tool-btn">
            <img id="invert" src="${pageContext.request.contextPath}/style/image/tool/invert.png">
            <span>흑백반전</span>
        </button>

        <button class="tool" id="Pan-tool-btn">
            <img id="pan" src="${pageContext.request.contextPath}/style/image/tool/pan.png">
            <span>이동</span>
        </button>

        <button class="tool" id="scroll-loop-btn">
            <img id="scrollLoop" src="${pageContext.request.contextPath}/style/image/tool/scrollLoop.png">
            <span>스크롤루프</span>
        </button>

        <!-- 플레이 클립 수정필요 -->
        <div class="tool-container">
            <button class="tool" id="Playclip-tool-btn">
                <img id="playclip" src="${pageContext.request.contextPath}/style/image/tool/playclip.png">
                <span>플레이</span>
            </button>
            <div id="fps-slider-container" style="display: none;">
                <div class="fps-controls">
                    <label for="fps-slider">FPS: <span id="fps-value">10</span></label>
                </div>
                <input type="range" id="fps-slider" min="1" max="100" value="10">
                <div class="button-controls">
                    <button class="tool" id="StartPlayclip-tool-btn">시작</button>
                    <button class="tool" id="StopPlayclip-tool-btn">정지</button>
                </div>
            </div>
        </div>

        <!-- 여기서 부터 도구툴 -->
        <button class="tool" id="toolGroupBtn">
            <img id="toolGroup" src="${pageContext.request.contextPath}/style/image/tool/toolGroup.png">
            <span>도구 ▼ </span>
        </button>

        <div class="tools-group" id="tools-group">
            <button class="tools" id="Magnify-tool-btn">
                <img id="magnify" src="${pageContext.request.contextPath}/style/image/tool/magnify.png">
                <span>돋보기</span>
            </button>
            <button class="tools" id="Zoom-tool-btn">
                <img id="zoom" src="${pageContext.request.contextPath}/style/image/tool/zoom.png">
                <span>확대/축소</span>
            </button>
            <button class="tools" id="Rotate-tool-btn">
                <img id="rotate" src="${pageContext.request.contextPath}/style/image/tool/rotate.png">
                <span>회전</span>
            </button>
            <button class="tools" id="RigthRotate-tool-btn">
                <img id="rightRotate" src="${pageContext.request.contextPath}/style/image/tool/rightRotate.png">
                <span>오른쪽회전</span>
            </button>
            <button class="tools" id="LeftRotate-tool-btn">
                <img id="leftRotate" src="${pageContext.request.contextPath}/style/image/tool/leftRotate.png">
                <span>왼쪽회전</span>
            </button>
            <button class="tools" id="WidthFlip-tool-btn">
                <img id="widthFlip" src="${pageContext.request.contextPath}/style/image/tool/widthFlip.png">
                <span>수평뒤집기</span>
            </button>
            <button class="tools" id="HeghtFlip-tool-btn">
                <img id="heightFlip" src="${pageContext.request.contextPath}/style/image/tool/heightFlip.png">
                <span>수직대칭이동</span>
            </button>
        </div>

        <!-- 여기서 주석툴임 리스트로 묶을것 -->
        <button class="tool" id="annotationBtn">
            <img id="annotation" src="${pageContext.request.contextPath}/style/image/tool/annotation.png">
            <span>주석 ▼</span>
        </button>

        <div class="annotation-group" id="annotation-group">
            <button class="tools" id="Length-tool-btn">
                <img id="length" src="${pageContext.request.contextPath}/style/image/tool/length.png">
                <span>길이</span>
            </button>

            <button class="tools" id="Height-tool-btn">
                <img id="height" src="${pageContext.request.contextPath}/style/image/tool/height.png">
                <span>높이</span>
            </button>

            <button class="tools" id="Probe-tool-btn">
                <img id="probe" src="${pageContext.request.contextPath}/style/image/tool/probe.png">
                <span>probe</span>
            </button>

            <button class="tools" id="RectangleROI-tool-btn">
                <img id="rectangle" src="${pageContext.request.contextPath}/style/image/tool/rectangle.png">
                <span>사각형그리기</span>
            </button>

            <button class="tools" id="EllipticalIROI-tool-btn">
                <img id="elliptical" src="${pageContext.request.contextPath}/style/image/tool/elliptical.png">
                <span>타원그리기</span>
            </button>

            <button class="tools" id="CircleROI-tool-btn">
                <img id="circle" src="${pageContext.request.contextPath}/style/image/tool/circle.png">
                <span>원그리기</span>
            </button>

            <button class="tools" id="Bidirectional-tool-btn">
                <img id="bidirectional" src="${pageContext.request.contextPath}/style/image/tool/bidirectional.png">
                <span>Bidirectional</span>
            </button>

            <button class="tools" id="Angle-tool-btn">
                <img id="angle" src="${pageContext.request.contextPath}/style/image/tool/angle.png">
                <span>자율그리기</span>
            </button>

            <button class="tools" id="CobbAngle-tool-btn">
                <img id="cobbAngle" src="${pageContext.request.contextPath}/style/image/tool/cobbAngle.png">
                <span>콥앵글</span>
            </button>

            <button class="tools" id="ArrowAnnotate-tool-btn">
                <img id="arrowAnnotate" src="${pageContext.request.contextPath}/style/image/tool/arrowAnnotate.png">
                <span>화살표주석</span>
            </button>

            <button class="tools" id="PlanarFreehandROI-tool-btn">
                <img id="planarFreehand" src="${pageContext.request.contextPath}/style/image/tool/planarFreehand.png">
                <span>그리기</span>
            </button>

            <button class="tools" id="Eraser-tool-btn">
                <img id="eraser" src="${pageContext.request.contextPath}/style/image/tool/eraser.png">
                <span>선택삭제</span>
            </button>

        </div>
        <!-- 리셋 -->
        <button class="tools" id="Reset-tool-btn">
            <img id="reset" src="${pageContext.request.contextPath}/style/image/tool/reset.png">
            <span>전부삭제</span>
        </button>

        <!-- 그리드 -->
        <button class="tools" id="grid-btn">
            <img id="showGrid" src="${pageContext.request.contextPath}/style/image/tool/grid.png">
            <span>그리드</span>
        </button>
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
                <textarea class="comment" id='comment' placeholder="코멘트"></textarea>
                <textarea class="quest" id='quest' placeholder="
[Finding]


[Conclusion]


[Recommend]

"></textarea>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/script/detail/dicom-render.js"></script>
<!-- dicom-render.js를 추가 -->
</body>
</html>
