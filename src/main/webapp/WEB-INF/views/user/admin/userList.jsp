<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
    <c:import url="/header" />
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<body>
<div class="container">
    <div class="table-container">
        <table>
            <thead>
            <tr>
                <th class="checkbox-cell"><input type="checkbox" id="selectAll"></th>
                <th>아이디</th>
                <th>이름</th>
                <th>그룹</th>
                <th>부서</th>
                <th>직책</th>
                <th>휴대폰번호</th>
                <th>주소</th>
                <th>신청일시</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="user" items="${users}">
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="userCheckbox" data-username="${user.username}"></td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                    <td>${user.userGroup}</td>
                    <td>${user.department}</td>
                    <td>${user.position}</td>
                    <td>${user.phone}</td>
                    <td>${user.address}</td>
                    <td>${user.formattedRegDate}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<div class="hamburger-menu">
    <div class="hamburger-button" onclick="toggleDropdownMenu()">☰</div>
    <div class="dropdown-menu" id="dropdownMenu">
        <button id="adminApproveBtn" onclick="location.href='/admin/authority'">사용자 승인 관리</button>
        <button id="deleteBtn" onclick="deleteBtnMenu()">사용자 삭제</button>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/menuButton.js"></script>
</html>
