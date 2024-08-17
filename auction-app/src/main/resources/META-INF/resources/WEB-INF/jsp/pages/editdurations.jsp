<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.model.DurationPreset" %>
<%
    List<DurationPreset> durations = (List<DurationPreset>) request.getAttribute("durations");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Durations</title>
</head>
<body>
    <h1>Edit Durations</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Duration ID</th>
                <th>Duration Name</th>
                <th>Hours</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <% for (DurationPreset duration : durations) { %>
                <tr>
                    <td><%= duration.getDurationID() %></td>
                    <td><%= duration.getName() %></td>
                    <td><%= duration.getHours() %></td>
                    <td>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="editDuration">
                            <input type="hidden" name="durationID" value="<%= duration.getDurationID() %>">
                            <input type="submit" value="Edit">
                        </form>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="deleteDuration">
                            <input type="hidden" name="durationID" value="<%= duration.getDurationID() %>">
                            <input type="submit" value="Delete">
                        </form>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
    <form action="EditDropdownServlet" method="post">
        <input type="hidden" name="action" value="createDuration">
        <label for="name">Duration Name:</label>
        <input type="text" name="name" id="name" required>
        <label for="hours">Hours:</label>
        <input type="text" name="hours" id="hours" required>
        <label for="isActive">Active:</label>
        <input type="checkbox" name="isActive" id="isActive" value="true">
        <input type="submit" value="Create">
    </form>
</body>
</html>
