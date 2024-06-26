<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.RegisterClass" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - View Users</title>
    <style>
        .top-right-button {
            float: right;
            margin: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="top-right-button">
        <form action="AdminHomeServlet" method="get">
            <button type="submit">Admin Home</button>
        </form>
    </div>
    <h1>Users List</h1>
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Number</th>
                <th>Address</th>
                <th>Active Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<RegisterClass> userList = (List<RegisterClass>) request.getAttribute("users");
                if (userList != null) {
                    for (RegisterClass user : userList) {
                        out.println("<tr>");
                        out.println("<td>" + user.getuName() + "</td>");
                        out.println("<td>" + user.getuMail() + "</td>");
                        out.println("<td>" + user.getuNum() + "</td>");
                        out.println("<td>" + user.getuAddress() + "</td>");
                        out.println("<td>" + (user.getisActive() ? "Active" : "Inactive") + "</td>");
                        out.println("<td>");
                        out.println("<form action='SuspendServlet' method='post' style='display:inline;'>");
                        out.println("<input type='hidden' name='uId' value='" + user.getuId() + "'>");
                        out.println("<button type='submit'>" + (user.getisActive() ? "Suspend" : "Unsuspend") + "</button>");
                        out.println("</form>");
                        out.println("<form action='ResetPasswordServlet' method='post' style='display:inline;'>");
                        out.println("<input type='hidden' name='uId' value='" + user.getuId() + "'>");
                        out.println("<input type='hidden' name='uMail' value='" + user.getuMail() + "'>");
                        out.println("<button type='submit'>Reset Password</button>");
                        out.println("</form>");
                        out.println("</td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
</body>
</html>
