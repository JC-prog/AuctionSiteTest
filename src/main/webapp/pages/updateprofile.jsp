<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.model.RegisterClass" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Profile</title>
</head>
<body>
    <h1>Update Profile</h1>
    <form action="UpdateProfileServlet" method="post">
        <%
            RegisterClass user = (RegisterClass) request.getAttribute("user");
            if (user != null) {
        %>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="<%= user.getuName() %>" required><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="<%= user.getuMail() %>" required><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" value="<%= user.getuPass() %>" required><br>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address" value="<%= user.getuAddress() %>" required><br>

        <button type="submit">Submit</button>
        <button type="submit" name="deactivate" value="true">Deactivate Account</button>
        <% } else { %>
        <p>User details not found.</p>
        <% } %>
    </form>
</body>
</html>
