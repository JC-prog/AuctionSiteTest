<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Item" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Home</title>
    <style>
        .top-right-button {
            float: right;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="top-right-button">
        <form action="AdminHomeServlet" method="get">
            <button type="submit">Refresh</button>
        </form>
         <form action="ViewUsersServlet" method="get">
            <button type="submit" class="button">View Users</button>
        </form>
         <form action="EditDropdownServlet" method="get">
        <button type="submit" name="action" value="editCategory">Edit Category</button>
        <button type="submit" name="action" value="editDuration">Edit Duration</button>
        <button type="submit" name="action" value="editCondition">Edit Condition</button>
    </form>
    </div>
    <h1>Admin - Item Listings</h1>
    <form action="SearchItemServlet" method="get">
        <input type="text" name="searchQuery" placeholder="Search for items">
        <input type="submit" value="Search">
    </form>
    <table border="1">
        <thead>
            <tr>
                <th>Item No</th>
                <th>Title</th>
                <th>Seller Name</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Price</th>
                <th>Min Sell Price</th>
                <th>Listing Status</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Item> itemList = (List<Item>) request.getAttribute("itemList");
                if (itemList != null) {
                    for (Item item : itemList) {
                        out.println("<tr>");
                        out.println("<td>" + item.getItemNo() + "</td>");
                        out.println("<td>" + item.getTitle() + "</td>");
                        out.println("<td>" + item.getSeller().getuName() + "</td>");
                        out.println("<td>" + item.getCategory().getCatName() + "</td>");
                        out.println("<td>" + item.getCondition() + "</td>");
                        out.println("<td>" + item.getDescription() + "</td>");
                        out.println("<td>" + item.getStartDate() + "</td>");
                        out.println("<td>" + item.getEndDate() + "</td>");
                        out.println("<td>" + item.getStartPrice() + "</td>");
                        out.println("<td>" + item.getMinSellPrice() + "</td>");
                        out.println("<td>" + item.getListingStatus() + "</td>");
                        
                        // Display image if available
                        byte[] imageData = item.getImage();
                        if (imageData != null) {
                            String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                            out.println("<td><img src=\"" + base64Image + "\" alt=\"Item Image\" style=\"max-width: 100px; max-height: 100px;\"></td>");
                        } else {
                            out.println("<td>No Image Available</td>");
                        }

                        out.println("<td>");
                        out.println("<a href='AdminEditItemServlet?itemNo=" + item.getItemNo() + "'>Edit Item</a>");
                        out.println("</td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
</body>
</html>
