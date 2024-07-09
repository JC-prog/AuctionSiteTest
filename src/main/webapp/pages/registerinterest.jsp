<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.model.ItemCategory" %>
<!DOCTYPE html>
<html>
<head>
    <title>Select Your Interests</title>
    <style>
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
    <h2>Select Your Interests</h2>
    <form action="<%= request.getContextPath() %>/RegisterInterestServlet" method="post">
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<ItemCategory> categories = (List<ItemCategory>) request.getAttribute("categories");
                    if (categories != null) {
                        for (ItemCategory category : categories) {
                %>
                <tr>
                    <td><input type="checkbox" name="categories" value="<%= category.getCategoryNo() %>" /></td>
                    <td><%= category.getCatName() %></td>
                </tr>
                <%
                        }
                    } else {
                %>
                <tr>
                    <td colspan="2">No categories available.</td>
                </tr>
                <%
                    }
                %>
            </tbody>
        </table>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
