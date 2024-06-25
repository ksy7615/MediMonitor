<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/join.css">
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/join.js"></script>
<body>
    <div class="container">
        <form class="signup-form" method="POST" action="/user/join">
            <div class="blue-line"></div>
            <input type="text" id="username" placeholder="아이디">
            <input type="password" id="password" placeholder="비밀번호">
            <input type="text" id="name" placeholder="이름">
            <select id="telecom">
                <option value="telecom" selected disabled>통신사</option>
                <option value="skt">SKT</option>
                <option value="kt">KT</option>
                <option value="lgt">LG U+</option>
            </select>
            <input id="phone" type="text" placeholder="휴대폰번호">
            <input id="birth" type="number" placeholder="생년월일">
            <input id="address" type="text" placeholder="주소">
            <input id="department" type="text" placeholder="부서">
            <select id="userGroup">
                <option value="userGroup" selected disabled>그룹</option>
                <option value="admin">admin</option>
                <option value="radiologist">radiologist</option>
                <option value="doctor">doctor</option>
                <option value="technician">technician</option>
            </select>
            <select id="position">
                <option value="position" selected disabled>직책</option>
                <option value="hd">Hospital Director</option>
                <option value="vp">Vice President</option>
                <option value="md">Medical Director</option>
                <option value="ap">Attending Physician</option>
                <option value="specialist">specialist</option>
                <option value="resident">resident</option>
                <option value="professor">professor</option>
            </select>
            <div class="error-container">
                <p class="error=msg" id="error-msg-id">아이디: 필수 정보입니다.</p>
                <p class="error=msg" id="error-msg-id-dupl">아이디: 이미 사용중인 아이디입니다.</p>
                <p class="error=msg" id="error-msg-password">비밀번호: 필수 정보입니다.</p>
                <p class="error=msg" id="error-msg-password-pattern">비밀번호는 영문,숫자로 이루어진 최소 8자리 최대 12자리로 입력해 주세요.</p>
                <p class="error-msg" id="error-msg-name">이름: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-birth">생년월일: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-birth-pattern">생년월일은 8자리 숫자로 입력해 주세요.</p>
                <p class="error-msg" id="error-msg-telecom">통신사: 이용하는 통신사를 선택해 주세요.</p>
                <p class="error-msg" id="error-msg-phone">휴대전화번호: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-phone-pattern">휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.</p>
                <p class="error-msg" id="error-msg-address">주소: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-department">부서: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-userGroup">그룹: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-position">직책: 필수 정보입니다.</p>
            </div>
            <button type="submit">회원가입</button>
        </form>
    </div>
</body>
</html>
