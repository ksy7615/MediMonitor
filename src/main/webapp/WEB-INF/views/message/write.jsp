<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <c:import url="/header"/>
</head>
<body>
<%--<c:if test="${empty user}">--%>
<%--    <script type="text/javascript">--%>
<%--        alert("로그인 후 이용가능합니다.");--%>
<%--        location.href='/login';--%>
<%--    </script>--%>
<%--</c:if>--%>
<div class="write-container">
    <h1>쪽지 보내기</h1>
    <form>
        <div class="form-group">
            <label for="sender">보내는사람</label>
            <input type="text" id="sender" name="sender-nickname" value="${user.username}" readonly>
        </div>
        <div class="form-group">
            <label for="receiver">받는사람</label>
            <input type="text" id="receiver" name="receiver" placeholder="아이디를 입력하세요.">
<%--            <button type="button" class="friend-list">친구목록</button>--%>
        </div>
        <div class="form-group-textarea">
            <textarea id="message" name="message" placeholder="쪽지 내용을 입력하세요"></textarea>
            <span class="char-count">0/300</span>
        </div>
        <div class="write-button-group">
            <button type="button" class="cancel">취소</button>
            <button type="submit" class="send">쪽지보내기</button>
        </div>
    </form>
</div>
</body>
</html>
