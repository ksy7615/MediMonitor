<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/style/message.css">
    <c:import url="/header"/>
</head>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/writeMessage.js"></script>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div class="write-container">
    <h1>쪽지 보내기</h1>
    <form>
        <div class="form-group">
            <label for="sender">보내는 사람</label>
            <input type="text" id="sender" name="sender-nickname" value="${user.username}" readonly>
        </div>
        <div class="form-group">
            <label for="recipient">받는 사람</label>
            <input type="text" id="recipient" name="recipient" placeholder="아이디를 입력하세요.">
            <button type="button" class="user-list" onclick="findUserModal()">아이디 검색</button>
        </div>
        <div class="form-group">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" placeholder="제목를 입력하세요.">
        </div>
        <div class="form-group-textarea">
            <textarea id="content" name="content" placeholder="쪽지 내용을 입력하세요"></textarea>
            <span class="char-count">0/300</span>
        </div>
        <div class="message-error-container">
            <p class="error=msg" id="error-msg-sender">보내는 사람: 필수 정보입니다.</p>
            <p class="error=msg" id="error-msg-sender-dupl">보내는 사람: 존재하지 않는 회원입니다.</p>
            <p class="error=msg" id="error-msg-recipient">받는 사람: 필수 정보입니다.</p>
            <p class="error=msg" id="error-msg-recipient-dupl">받는 사람: 존재하지 않는 회원입니다.</p>
            <p class="error=msg" id="error-msg-title">제목: 필수 정보입니다.</p>
            <p class="error=msg" id="error-msg-content">내용: 필수 정보입니다.</p>
        </div>
        <div class="write-button-group">
            <button type="button" class="cancel" onclick="location.href='/main'">취소</button>
            <button type="submit" class="send">쪽지보내기</button>
        </div>
    </form>
</div>

<!-- 모달 -->
<div id="userModal" class="find-user-modal">
    <div class="find-user-modal-content">
        <span class="find-user-close" onclick="closeModal()">&times;</span>
        <h2>아이디 검색</h2>
        <input type="text" id="searchName" placeholder="이름을 입력하세요">
        <button type="button" id="find-user-button" onclick="searchUser()">검색</button>
        <div id="searchResults"></div>
    </div>
</div>

</body>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/message/findUsername.js"></script>
</html>
