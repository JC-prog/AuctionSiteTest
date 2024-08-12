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

    <!-- Form to Create a New Category -->
    <h2>Create a New Category</h2>
    <form action="${pageContext.request.contextPath}/category/create" method="post">
        <label for="catName">Category Name:</label>
        <input type="text" id="catName" name="catName" required>
        <button type="submit">Create</button>
    </form>

    <!-- Table to Display Categories -->
    <h2>Existing Categories</h2>
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
                        <td><%= category.getId() %></td>
                        <td><%= category.getCatName() %></td>
                        <td>
                            <!-- Delete Form -->
                            <form action="${pageContext.request.contextPath}/category/delete" method="post" style="display:inline;">
                                <input type="hidden" name="id" value="<%= category.getId() %>">
                                <button type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
            <%  } } %>
        </tbody>
    </table>
</body>
</html>
