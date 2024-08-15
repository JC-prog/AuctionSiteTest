<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fyp.auction_app.models.User" %>
<%
    List<User> users = (List<User>) request.getAttribute("users");
%>

<html>
<head>
    <title>User List</title>
</head>
<body>
    <h1>Users</h1>
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="user" items="${users}">
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.status}</td>
                    <td>
                        <form action="${pageContext.request.contextPath}/user/changeStatus" method="post">
                            <input type="hidden" name="id" value="${user.id}" />
                            <button type="submit">
                                <c:choose>
                                    <c:when test="${user.status == 'ACTIVE'}">
                                        Suspend
                                    </c:when>
                                    <c:otherwise>
                                        Activate
                                    </c:otherwise>
                                </c:choose>
                            </button>
                        </form>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>
