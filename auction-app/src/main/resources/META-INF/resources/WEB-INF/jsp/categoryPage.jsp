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
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        h1, h2 {
            color: #343a40;
        }
        form {
            margin-bottom: 20px;
        }
        input[type="text"] {
            padding: 8px;
            width: 200px;
            border: 1px solid #ced4da;
            border-radius: 4px;
        }
        button {
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: white;
        }
        th, td {
            padding: 12px;
            border: 1px solid #dee2e6;
            text-align: left;
        }
        th {
            background-color: #e9ecef;
        }
        td button {
            background-color: #dc3545;
        }
        td button:hover {
            background-color: #c82333;
        }
    </style>
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
    <table>
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
            <%  } } else { %>
                    <tr>
                        <td colspan="3">No categories found.</td>
                    </tr>
            <% } %>
        </tbody>
    </table>
</body>
</html>
