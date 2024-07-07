<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Item" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Recommended Items</title>
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
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            max-width: 100px;
            max-height: 100px;
        }
    </style>
</head>
<body>
    <div class="top-right-button">
        <form action="ViewTradeRequestsServlet" method="get">
            <button type="submit">View Trade Requests</button>
        </form>
        <form action="createItem" method="get">
            <button type="submit">Sell</button>
        </form>
        <form action="ShowMyItemsServlet" method="get">
            <button type="submit">View My Listings</button>
        </form>
        <form action="ViewTransactionServlet" method="get">
            <button type="submit">View Transactions</button>
        </form>
    </div>
    <h1>Recommended Items</h1>
    <table>
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
                <th>View Item</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Item> recommendedItems = (List<Item>) request.getAttribute("recommendedItems");
                if (recommendedItems != null) {
                    for (Item item : recommendedItems) {
                        out.println("<tr>");
                        out.println("<td>" + item.getItemNo() + "</td>");
                        out.println("<td>" + item.getTitle() + "</td>");
                        out.println("<td>" + item.getSeller().getuName() + "</td>");
                        out.println("<td>" + item.getCategory().getCatName() + "</td>");
                        out.println("<td>" + item.getCondition().getName() + "</td>");
                        out.println("<td>" + item.getDescription() + "</td>");
                        out.println("<td>" + item.getStartDate() + "</td>");
                        out.println("<td>" + item.getEndDate() + "</td>");
                        out.println("<td>" + item.getStartPrice() + "</td>");
                        out.println("<td>" + item.getMinSellPrice() + "</td>");
                        out.println("<td>" + item.getListingStatus() + "</td>");
                        
                        byte[] imageData = item.getImage();
                        if (imageData != null) {
                            String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                            out.println("<td><img src=\"" + base64Image + "\" alt=\"Item Image\"></td>");
                        } else {
                            out.println("<td>No Image Available</td>");
                        }

                        out.println("<td><a href='ViewItemServlet?itemNo=" + item.getItemNo() + "'>View Item</a></td>");
                        out.println("</tr>");
                    }
                } else {
                    out.println("<tr><td colspan='13'>No recommended items found.</td></tr>");
                }
            %>
        </tbody>
    </table>
</body>
</html>
