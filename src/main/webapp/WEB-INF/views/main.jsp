<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEDIMONITOR</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/main.css">
    <c:import url="/header" />
</head>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>

<div class="container">
    <div class="content">
        <aside class="sidebar">
            <button class="button" id="getAllStudiesBtn">전체</button>
            <button class="button" id="reset">재설정</button>
            <div class="search">
                <form id="searchForm">
                    <input type="text" id="pid" name="pid" placeholder="환자 아이디">
                    <input type="text" id="pname" name="pname" placeholder="환자 이름">
                    <select id="reportstatus" name="reportstatus">
                        <option value="">판독상태</option>
                        <option value="notread">읽지않음</option>
                        <option value="reading">열람중</option>
                        <option value="predecipher">예비판독</option>
                        <option value="decipher">판독</option>
                    </select>
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
                    <label>검사일자</label>
                    <div class="date-select">
                        <input type="date" id="startDate" name="startDate" class="date-start" value="1990-01-01"/>
                        <span>To</span>
                        <input type="date" id="endDate" name="endDate" class="date-end"/>
                    </div>
                    <label>검사장비</label>
                    <select id="modality" name="modality">
                        <option value="">선택</option>
                        <option value="AS">AS</option>
                        <option value="AU">AU</option>
                        <option value="BI">BI</option>
                        <option value="CD">CD</option>
                        <option value="CF">CF</option>
                        <option value="CP">CP</option>
                        <option value="CR">CR</option>
                        <option value="CS">CS</option>
                        <option value="CT">CT</option>
                        <option value="DD">DD</option>
                        <option value="DF">DF</option>
                        <option value="DG">DG</option>
                        <option value="DM">DM</option>
                        <option value="DR">DR</option>
                        <option value="DS">DS</option>
                        <option value="DX">DX</option>
                        <option value="EC">EC</option>
                        <option value="ES">ES</option>
                        <option value="FA">FA</option>
                        <option value="FS">FS</option>
                        <option value="LS">LS</option>
                        <option value="LP">LP</option>
                        <option value="MA">MA</option>
                        <option value="MR">MR</option>
                        <option value="MS">MS</option>
                        <option value="NM">NM</option>
                        <option value="OT">OT</option>
                        <option value="PT">PT</option>
                        <option value="RF">RF</option>
                        <option value="RG">RG</option>
                        <option value="ST">ST</option>
                        <option value="TG">TG</option>
                        <option value="US">US</option>
                        <option value="VF">VF</option>
                    </select>
                    <label>Verify</label>
                    <select id="examstatus">
                        <option value="">선택해주세요</option>
                        <option value="1">Not Requested</option>
                        <option value="2">Request Completed</option>
                    </select>
                    <button type="button" class="button search-button" id="searchButton">검색</button>
                </form>
            </div>
        </aside>

        <main class="main-content">
            <div class="all-info">
                <table class="data-table" id="data-table">
                    <thead>
                    <tr>
                        <th>환자 아이디</th>
                        <th>환자 이름</th>
                        <th>검사장비</th>
                        <th>검사설명</th>
                        <th>검사일시</th>
                        <th>판독상태</th>
                        <th>시리즈</th>
                        <th>이미지</th>
                        <th>Verify</th>
                    </tr>
                    </thead>
                    <tbody class="contentBody">

                    <!-- Add more rows as necessary -->

                    </tbody>
                </table>
                <div class="button-set">
                    <button class="button blue-button" id="left">◀</button>
                    <label id="pageCnt"></label>
                    <button class="button blue-button" id="right">▶</button>
                </div>
                <div id="pageInfo"></div>
            </div>

            <div class="box">
                <div class="previous">
                    <h2>Previous</h2>
                    <div class="info-box">
                        <p class="previous-id">환자 아이디: </p>
                        <p class="previous-name">환자 이름: </p>
                    </div>
                    <table class="previous-table" id="previous-table">
                        <thead>
                        <tr>
                            <th>검사장비</th>
                            <th>검사설명</th>
                            <th>검사일시</th>
                            <th>판독상태</th>
                            <th>시리즈</th>
                            <th>이미지</th>
                            <th>Verify</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div class="report">
                    <div class="report-title">
                        <h2>Report</h2>
                        <button class="button" id="removeReport">판독지우기</button>
                    </div>
                    <div class="report-box">
                        <div class="write-box">
                            <textarea class="comment" id='comment' placeholder="코멘트" disabled></textarea>
                            <textarea class="quest" id='quest' placeholder="
[Finding]

[Conclusion]

[Recommend]

" disabled></textarea>
                        </div>
                        <div class="input-box">
                            <label>예비판독의</label>
                            <input class="inputText" type="text" id="preDoctor" disabled>
                            <label>판독의1</label>
                            <input class="inputText" type="text" id="firstDoctor" disabled>
                            <label>판독의2</label>
                            <input class="inputText" type="text" id="secondDoctor" disabled>
                            <input type="hidden" id="username" value=${user.username}>
                            <div class="reading-box">
                                <button class="button blue-button" id="btn-reading">판독</button>
                                <button class="button" id="btn-pre-reading">예비판독</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/script/main.js"></script>

</body>
</html>