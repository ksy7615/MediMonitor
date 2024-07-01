<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>회원정보 수정</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
    <c:import url="/header" />
</head>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/update.js"></script>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div class="container">
    <h1>회원정보 수정</h1>
    <form class="signup-form" method="POST" action="${pageContext.request.contextPath}/join">
        <div class="join-blue-line"></div>
        <input type="text" id="username" placeholder="아이디" value="${user.username}" disabled>
        <input type="password" id="new-password" placeholder="새비밀번호">
        <input type="text" id="name" placeholder="이름" value="${user.name}" disabled>
        <select id="telecom">
            <option value="skt" ${user.telecom == 'skt' ? 'selected' : ''}>SKT</option>
            <option value="kt"  ${user.telecom == 'kt' ? 'selected' : ''}>KT</option>
            <option value="lgt" ${user.telecom == 'lgt' ? 'selected' : ''}>LG U+</option>
        </select>
        <input id="phone" type="text" placeholder="휴대폰번호" value="${user.phone}">
        <input id="birth" type="number" placeholder="생년월일" value="${user.birth}" disabled>
        <input id="address" type="text" placeholder="주소" value="${user.address}">
        <input id="department" type="text" placeholder="부서" value="${user.department}">
        <select id="userGroup">
            <option value="userGroup" disabled>그룹</option>
            <option value="admin" ${user.userGroup == 'admin' ? 'selected' : ''}>관리자</option>
            <option value="radiologist" ${user.userGroup == 'radiologist' ? 'selected' : ''}>방사선사</option>
            <option value="doctor" ${user.userGroup == 'doctor' ? 'selected' : ''}>의사</option>
            <option value="technician" ${user.userGroup == 'technician' ? 'selected' : ''}>테크니션</option>
        </select>
        <select id="position">
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
        <div class="error-container">
            <p class="error=msg" id="error-msg-new-password-pattern">새비밀번호는 영문,숫자로 이루어진 최소 8자리 최대 12자리로 입력해 주세요.</p>
            <p class="error-msg" id="error-msg-telecom">통신사: 이용하는 통신사를 선택해 주세요.</p>
            <p class="error-msg" id="error-msg-phone">휴대전화번호: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-phone-pattern">휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.</p>
            <p class="error-msg" id="error-msg-address">주소: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-department">부서: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-userGroup">그룹: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-position">직책: 필수 정보입니다.</p>
        </div>
        <button type="submit">수정</button>
    </form>
</div>
</body>
</html>
