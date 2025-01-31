<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
    <c:import url="/header" />
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/menuButton.js"></script>
<body>
<c:choose>
    <c:when test="${empty user}">
        <script type="text/javascript">
            alert("로그인 후 이용가능합니다.");
            location.href='/login';
        </script>
    </c:when>
    <c:when test="${not empty user && user.userGroup ne 'admin'}">
        <script type="text/javascript">
            alert("관리자만 이용가능합니다.");
            location.href='/main';
        </script>
    </c:when>
</c:choose>
<div id="userList-container">
    <h1 id="userList-h1">계정 목록</h1>
    <div class="card-container">
        <c:forEach var="user" items="${users}">
            <div class="card">
                <div class="card-header">
                    <div>${user.name}</div>
                </div>
                <div class="card-body">
                    <p><strong>아이디:</strong> ${user.username}</p>
                    <p><strong>그룹:</strong> ${user.userGroup}</p>
                    <p><strong>부서:</strong> ${user.department}</p>
                    <p><strong>직책:</strong> ${user.position}</p>
                    <p><strong>휴대폰번호:</strong> ${user.phone}</p>
                    <p><strong>주소:</strong> ${user.address}</p>
                    <p><strong>가입일시:</strong> ${user.formattedRegDate}</p>
                </div>
                <div class="card-footer">
                    <c:if test="${user.position ne 'admin'}">
                        <div class="checkbox-cell"><input type="checkbox" class="userCheckbox" data-username="${user.username}"></div>
                    </c:if>
                </div>
            </div>
        </c:forEach>
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
</html>
