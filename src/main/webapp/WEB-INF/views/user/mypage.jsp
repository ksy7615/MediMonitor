<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>회원정보</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
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
    <h1>회원정보</h1>
    <div class="signup-form ">
        <div class="blue-line"></div>
        <input type="text" id="username" placeholder="아이디" value="${user.username}" disabled>
        <input type="text" id="name" placeholder="이름" value="${user.name}" disabled>
        <select id="telecom" disabled>
            <option value="skt" ${user.telecom == 'skt' ? 'selected' : ''}>SKT</option>
            <option value="kt"  ${user.telecom == 'kt' ? 'selected' : ''}>KT</option>
            <option value="lgt" ${user.telecom == 'lgt' ? 'selected' : ''}>LG U+</option>
        </select>
        <input id="phone" type="text" placeholder="휴대폰번호" value="${user.phone}" disabled>
        <input id="birth" type="number" placeholder="생년월일" value="${user.birth}" disabled>
        <input id="address" type="text" placeholder="주소" value="${user.address}" disabled>
        <input id="department" type="text" placeholder="부서" value="${user.department}" disabled>
        <select id="userGroup" disabled>
            <option value="userGroup" disabled>그룹</option>
            <option value="admin" ${user.userGroup == 'admin' ? 'selected' : ''}>관리자</option>
            <option value="radiologist" ${user.userGroup == 'radiologist' ? 'selected' : ''}>방사선사</option>
            <option value="doctor" ${user.userGroup == 'doctor' ? 'selected' : ''}>의사</option>
            <option value="technician" ${user.userGroup == 'technician' ? 'selected' : ''}>테크니션</option>
        </select>
        <select id="position" disabled>
            <option value="position" disabled>직책</option>
            <option value="admin" ${user.position == 'admin' ? 'selected' : ''}>관리자</option>
            <option value="hd" ${user.position == 'hd' ? 'selected' : ''}>원장</option>
            <option value="vp" ${user.position == 'vp' ? 'selected' : ''}>부원장</option>
            <option value="md" ${user.position == 'md' ? 'selected' : ''}>과장</option>
            <option value="ap" ${user.position == 'ap' ? 'selected' : ''}>주치의</option>
            <option value="specialist" ${user.position == 'specialist' ? 'selected' : ''}>전문의</option>
            <option value="resident" ${user.position == 'resident' ? 'selected' : ''}>전공의</option>
            <option value="professor" ${user.position == 'professor' ? 'selected' : ''}>교수</option>
        </select>

        <button onclick="location.href='/check'">회원정보 수정</button>
        <button>회원 탈퇴</button>
    </div>
</div>
</body>
</html>
