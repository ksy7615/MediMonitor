<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/user.css">
    <c:import url="/header" />
</head>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/join.js"></script>
<body>
    <div class="container">
        <h1>회원가입</h1>
        <form class="signup-form" method="POST" action="${pageContext.request.contextPath}/join">
            <div class="join-blue-line"></div>
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
            <select id="department" name="department">
                <option selected disabled>부서</option>
                <option value="신경과">신경과</option>
                <option value="심장내과">심장내과</option>
                <option value="종양내과">종양내과</option>
                <option value="소아과">소아과</option>
                <option value="정형외과">정형외과</option>
                <option value="영상의학과">영상의학과</option>
                <option value="피부과">피부과</option>
                <option value="안과">안과</option>
                <option value="소화기내과">소화기내과</option>
                <option value="내분비내과">내분비내과</option>
                <option value="혈액내과">혈액내과</option>
                <option value="신장내과">신장내과</option>
                <option value="비뇨기과">비뇨기과</option>
                <option value="호흡기내과">호흡기내과</option>
                <option value="마취과">마취과</option>
                <option value="응급의학과">응급의학과</option>
                <option value="가정의학과">가정의학과</option>
                <option value="일반외과">일반외과</option>
                <option value="내과">내과</option>
                <option value="산부인과">산부인과</option>
                <option value="이비인후과">이비인후과</option>
                <option value="병리과">병리과</option>
                <option value="재활의학과">재활의학과</option>
                <option value="성형외과">성형외과</option>
                <option value="정신건강의학과">정신건강의학과</option>
                <option value="임상병리과">임상병리과</option>
            </select>
            <select id="userGroup">
                <option value="userGroup" selected disabled>그룹</option>
                <option value="radiologist">방사선사</option>
                <option value="doctor">의사</option>
                <option value="technician">테크니션</option>
            </select>
            <select id="position">
                <option value="position" selected disabled>직책</option>
                <option value="hd">원장</option>
                <option value="vp">부원장</option>
                <option value="md">과장</option>
                <option value="ap">주치의</option>
                <option value="specialist">전문의</option>
                <option value="resident">전공의</option>
                <option value="professor">교수</option>
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
                <p class="error-msg" id="error-msg-phone-dupl">휴대전화번호: 사용할 수 없는 전화번호입니다.</p>
                <p class="error-msg" id="error-msg-address">주소: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-department">부서: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-userGroup">그룹: 필수 정보입니다.</p>
                <p class="error-msg" id="error-msg-position">직책: 필수 정보입니다.</p>
            </div>
            <button type="submit">다음</button>
        </form>
    </div>
</body>
</html>
