<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/agree.css">
    <c:import url="/header" />
</head>
<body>
<div class="form-container">
    <h2>영상정보 열람 / 제공 동의서</h2>
    <form action="submit_form.jsp" method="post">
        <table>
            <tr>
                <th>성명</th>
                <td><input type="text" name="name" id="name"></td>
                <th>연락처</th>
                <td><input type="text" name="phone" id="phone"></td>
            </tr>
            <tr>
                <th>생년월일</th>
                <td><input type="text" name="birth" id="birth"></td>
                <th>소속기관 및 부서</th>
                <td><input type="text" name="department" id="department"></td>
            </tr>
            <tr>
                <th>주소</th>
                <td><input type="text" name="address" id="address"></td>
                <th>직책</th>
                <td><input type="text" name="position" id="position"></td>
            </tr>
            <tr>
                <th>영상정보 열람·제공하는 자</th>
                <td colspan="3"><input type="text" name="provider" id="provider"></td>
            </tr>
            <tr>
                <th>열람·제공하는 영상정보의 내용</th>
                <td colspan="3"><input type="text" name="consent-content" id="consent-content"></td>
            </tr>
            <tr>
                <th>열람·제공 목적 및 사유</th>
                <td colspan="3"><input type="text" name="purpose" id="purpose"></td>
            </tr>
            <tr>
                <th>열람·제공하는 자의 영상정보 보유 및 이용 기간</th>
                <td colspan="3"><input type="text" name="duration" id="duration"></td>
            </tr>
        </table>
        <div class="checkboxes">
            <label>
                <input type="radio" name="consent" value="agree">
                동의함
            </label>
            <label>
                <input type="radio" name="consent" value="disagree">
                동의하지 않음
            </label>
        </div>
        <p>본인은 「개인정보 보호법」 제17조에 따라 동의를 거부할 권리가 있음을 알고 있습니다.</p>
        <div class="radios">
            <label>
                <input type="radio" name="awareness" value="yes">
                예
            </label>
            <label>
                <input type="radio" name="awareness" value="no">
                아니오
            </label>
        </div>
        <div class="error-container">
            <p class="error-msg" id="error-msg-name">이름: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-phone">휴대전화번호: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-phone-pattern">휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.</p>
            <p class="error-msg" id="error-msg-phone-dupl">휴대전화번호: 사용할 수 없는 전화번호입니다.</p>
            <p class="error-msg" id="error-msg-birth">생년월일: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-birth-pattern">생년월일은 8자리 숫자로 입력해 주세요.</p>
            <p class="error-msg" id="error-msg-department">소속기관 및 부서: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-address">주소: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-position">직책: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-provider">영상정보 열람·제공하는 자: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-consent-content">열람·제공하는 영상정보의 내용: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-purpose">열람·제공 목적 및 사유: 필수 정보입니다.</p>
            <p class="error-msg" id="error-msg-duration">열람·제공하는 자의 영상정보 보유 및 이용 기간: 필수 정보입니다.</p>
        </div>
        <div class="submit-section">
            <input type="submit" value="회원가입">
        </div>
    </form>
</div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/user/agree.js"></script>
</html>
