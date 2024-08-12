<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fyp.auction_app.models.ItemCategory" %>
<%
    List<ItemCategory> categories = (List<ItemCategory>) request.getAttribute("categories");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Categories</title>
</head>
<body>
    <h1>Categories</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <% if (categories != null) {
                for (ItemCategory category : categories) { %>
                    <tr>
                        <td>Test</td>
                        <td>Test</td>
                        <td>
                            <!-- Action buttons like edit or delete go here -->
                        </td>
                    </tr>
            <%  } } %>
        </tbody>
    </table>
</body>
</html>
