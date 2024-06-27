<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.model.RegisterClass" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit User Details</title>
</head>
<body>
    <h1>Edit User Details</h1>
    <%
        RegisterClass user = (RegisterClass) request.getAttribute("user");
        if (user != null) {
    %>
    <form action="EditUserServlet" method="post">
        <input type="hidden" name="uId" value="<%= user.getuId() %>">
        <label for="uName">Username:</label>
        <input type="text" id="uName" name="uName" value="<%= user.getuName() %>"><br>
        <label for="uMail">Email:</label>
        <input type="text" id="uMail" name="uMail" value="<%= user.getuMail() %>"><br>
        <label for="uNum">Number:</label>
        <input type="text" id="uNum" name="uNum" value="<%= user.getuNum() %>"><br>
        <label for="uAddress">Address:</label>
        <input type="text" id="uAddress" name="uAddress" value="<%= user.getuAddress() %>"><br>
        <button type="submit">Submit</button>
    </form>
    <%
        } else {
            out.println("<p>User not found.</p>");
        }
    %>
</body>
</html>
