<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, java.util.Map" %>
<%@ page import="com.model.Condition" %>
<%
    List<Condition> conditions = (List<Condition>) request.getAttribute("conditions");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Conditions</title>
</head>
<body>
    <h1>Edit Conditions</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Condition ID</th>
                <th>Condition Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <% for (Condition condition : conditions) { %>
                <tr>
                    <td><%= condition.getConditionID() %></td>
                    <td><%= condition.getName() %></td>
                    <td>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="editCondition">
                            <input type="hidden" name="conditionID" value="<%= condition.getConditionID() %>">
                            <input type="submit" value="Edit">
                        </form>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="deleteCondition">
                            <input type="hidden" name="conditionID" value="<%= condition.getConditionID() %>">
                            <input type="submit" value="Delete">
                        </form>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
    <form action="EditDropdownServlet" method="post">
        <input type="hidden" name="action" value="createCondition">
        <label for="name">Condition Name:</label>
        <input type="text" name="name" id="name" required>
        <label for="isActive">Active:</label>
        <input type="checkbox" name="isActive" id="isActive" value="true">
        <input type="submit" value="Create">
    </form>
</body>
</html>
