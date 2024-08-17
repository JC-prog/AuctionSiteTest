<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Item" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Listings</title>
    <style>
        .top-right-button {
            float: right;
            margin: 10px;
        }
    </style>
</head>
<body>
 
    <h1>My Listings</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Item No</th>
                <th>Title</th>
                <th>Seller ID</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Price</th>
                <th>Min Sell Price</th>
                <th>Listing Status</th>
                <th>Image</th>
                <th>Edit Listing</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Item> myItems = (List<Item>) request.getAttribute("myItems");
                if (myItems != null) {
                    for (Item item : myItems) {
                        out.println("<tr>");
                        out.println("<td>" + item.getItemNo() + "</td>");
                        out.println("<td>" + item.getTitle() + "</td>");
                        out.println("<td>" + item.getSeller().getuId() + "</td>");
                        out.println("<td>" + item.getCategory().getCatName() + "</td>");
                        out.println("<td>" + item.getCondition().getName() + "</td>");
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

                        // Edit Listing column
                        out.println("<td><a href='EditItemServlet?itemNo=" + item.getItemNo() + "'>Edit</a></td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
</body>
</html>
