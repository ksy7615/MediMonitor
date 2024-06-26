<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
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
                    <td class="checkbox-cell"><input type="checkbox" checked></td>
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

    <div class="action-buttons">
        <button id="approveBtn">승인</button>
        <button id="rejectBtn">거절</button>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/menuButton.js"></script>
</html>
