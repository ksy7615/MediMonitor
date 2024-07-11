<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>접근 기록 확인</title>
    <c:import url="/header" />
    <script type="text/javascript">
        console.log('JSP is loaded'); // JSP 파일이 로드되었는지 확인
    </script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/script/user/log.js"></script>
</head>
<body>
<c:if test="${empty user}">
    <script type="text/javascript">
        alert("로그인 후 이용가능합니다.");
        location.href='/login';
    </script>
</c:if>
<div class="log-info">
    <input type="hidden" id="username" value="${user.username}">
    <table class="log-table" id="log-table">
        <thead>
        <tr>
            <th>Code</th>
            <th>Study Key</th>
            <th>ID</th>
            <th>접근일시</th>
        </tr>
        </thead>
        <tbody class="contentBody">
        </tbody>
    </table>
</div>
<script type="text/javascript">
    console.log('Inline script is executed'); // 인라인 스크립트가 실행되었는지 확인
</script>
</body>
</html>