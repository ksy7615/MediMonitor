<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEDIMONITOR</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/main.css">
</head>
<body>
<div class="container">
    <div class="content">
        <aside class="sidebar">
            <button class="button" id="getAllStudiesBtn">전체</button>
            <button class="button">재설정</button>
            <div class="search">
                <label>환자 아이디</label>
                <input type="text">
                <label>환자 이름</label>
                <input type="text">
                <label>판독 상태</label>
                <input type="text">
                <label>달력</label>
                <input type="text" class="calendar">
                <label>검사일자</label>
                <div class="date-range">
                    <input type="date">
                    <span>To</span>
                    <input type="date">
                </div>
                <label>검사장비</label>
                <select>
                    <option>선택해주세요</option>
                </select>
                <label>Verify</label>
                <select>
                    <option>선택해주세요</option>
                </select>
                <button class="button search-button">검색</button>
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
                    <button class="button blue-button" id="right">▶</button>
                </div>
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
                        <button class="button">판독지우기</button>
                    </div>
                    <div class="report-box">
                        <div class="write-box">
                            <textarea class="comment" placeholder="코멘트"></textarea>
                            <textarea class="quest" placeholder="탐색"></textarea>
                        </div>
                        <div class="input-box">
                            <label>예비판독의</label>
                            <input class="inputText" type="text">
                            <label>판독의1</label>
                            <input class="inputText" type="text">
                            <label>판독의2</label>
                            <input class="inputText" type="text">
                            <div class="reading-box">
                                <button class="button blue-button">판독</button>
                                <button class="button">예비판독</button>
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