<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.model.ItemCategory" %>
<%
    List<ItemCategory> categories = (List<ItemCategory>) request.getAttribute("categories");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Categories</title>
</head>
<body>
    <h1>Edit Categories</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <% for (ItemCategory category : categories) { %>
                <tr>
                    <td><%= category.getCategoryNo() %></td>
                    <td><%= category.getCatName() %></td>
                    <td>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="editCategory">
                            <input type="hidden" name="categoryNo" value="<%= category.getCategoryNo() %>">
                            <input type="hidden" name="catName" value="<%= category.getCatName() %>">
                            <input type="hidden" name="isActive" value="<%= category.isActive() %>">
                            <input type="submit" value="Edit">
                        </form>
                        <form action="EditDropdownServlet" method="post">
                            <input type="hidden" name="action" value="deleteCategory">
                            <input type="hidden" name="categoryNo" value="<%= category.getCategoryNo() %>">
                            <input type="submit" value="Delete">
                        </form>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
    <h2>Create New Category</h2>
    <form action="EditDropdownServlet" method="post">
        <input type="hidden" name="action" value="createCategory">
        <label for="catName">Category Name:</label>
        <input type="text" name="catName" id="catName" required>
        <label for="isActive">Active:</label>
        <input type="checkbox" name="isActive" id="isActive" value="true">
        <input type="submit" value="Create">
    </form>
</body>
</html>
