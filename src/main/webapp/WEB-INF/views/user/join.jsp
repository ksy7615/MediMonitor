<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/join.css">
</head>
<body>
    <div class="container">
        <form class="signup-form">
            <div class="blue-line"></div>
            <input type="text" placeholder="아이디" required>
            <input type="password" placeholder="비밀번호" required>
            <input type="text" placeholder="이름" required>
            <select required>
                <option value="telecom" selected disabled>통신사</option>
                <option value="skt">SKT</option>
                <option value="kt">KT</option>
                <option value="lg">LG U+</option>
            </select>
            <input type="text" placeholder="휴대폰번호" required>
            <input type="number" placeholder="생년월일" required>
            <input type="text" placeholder="주소" required>
            <select required>
                <option value="group" selected disabled>그룹</option>
                <option value="admin">admin</option>
                <option value="radiologist">radiologist</option>
                <option value="doctor">doctor</option>
                <option value="technician">technician</option>
            </select>
            <select required>
                <option value="position" selected disabled>직책</option>
                <option value="hd">Hospital Director</option>
                <option value="vp">Vice President</option>
                <option value="md">Medical Director</option>
                <option value="ap">Attending Physician</option>
                <option value="specialist">specialist</option>
                <option value="resident">resident</option>
                <option value="professor">professor</option>
            </select>
            <button type="submit">회원가입</button>
        </form>
    </div>
</body>
</html>
