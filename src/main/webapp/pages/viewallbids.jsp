<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.List, com.model.Item, com.model.Transaction , com.service.ItemService , com.model.BuyerTransaction,com.model.SellerTransaction " %>
<!DOCTYPE html>
<html>
<head>
    <title>View All Bids</title>
</head>
<body>
    <h1>Items I Won the Bid</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Item No</th>
                <th>Title</th>
                <th>Sale Amount</th>
                <th>Seller Name</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<BuyerTransaction> buyerTransactions = (List<BuyerTransaction>) request.getAttribute("transactionsAsBuyer");
                if (buyerTransactions != null) {
                    for (BuyerTransaction transaction : buyerTransactions) {
                        out.println("<tr>");
                        out.println("<td>" + transaction.getItemNo() + "</td>");
                        
                        // Fetch item details based on itemNo
                        Item item = ItemService.getItemDetails(transaction.getItemNo());
                        if (item != null) {
                            out.println("<td><a href='ViewItemServlet?itemNo=" + transaction.getItemNo() + "'>" + item.getTitle() + "</a></td>");
                        } else {
                            out.println("<td>Item Not Found</td>");
                        }
                        
                        out.println("<td>" + transaction.getSaleAmount() + "</td>");
                        out.println("<td>" + transaction.getBuyerName() + "</td>");
                        out.println("<td>" + transaction.getStatus() + "</td>");
                        out.println("<td>" + transaction.getTimestamp() + "</td>");
                        out.println("<td>");
                        if ("Completed".equals(transaction.getStatus())) {
                            out.println("<form action='PaymentServlet' method='get'>");
                            out.println("<input type='hidden' name='transactionID' value='" + transaction.getTransactionID() + "'>");
                            out.println("<input type='hidden' name='itemNo' value='" + transaction.getItemNo() + "'>");
                            out.println("<input type='hidden' name='saleAmount' value='" + transaction.getSaleAmount() + "'>");
                            out.println("<button type='submit'>Pay</button>");
                            out.println("</form>");
                        } else if ("Payment Made".equals(transaction.getStatus()))
                        {
                            out.println("Paid, awaiting seller");
                        } else if ("Item Shipped".equals(transaction.getStatus()))
                        {
                        	 out.println("<form action='ReceivedItemServlet' method='get'>");
                             out.println("<input type='hidden' name='transactionID' value='" + transaction.getTransactionID() + "'>");
                             out.println("<input type='hidden' name='itemNo' value='" + transaction.getItemNo() + "'>");
                             out.println("<input type='hidden' name='saleAmount' value='" + transaction.getSaleAmount() + "'>");
                             out.println("<button type='submit'>Received</button>");
                             out.println("</form>");
                        }
                        else if ("Item Received".equals(transaction.getStatus()))
                        {
                        	out.println("Auction Concluded");
                        }
                        out.println("</td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
    
    <h1>Items I Sold</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Item No</th>
                <th>Title</th>
                <th>Sale Amount</th>
                <th>Buyer Name</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            <%
                List<SellerTransaction> sellerTransactions = (List<SellerTransaction>) request.getAttribute("transactionsAsSeller");
                if (sellerTransactions != null) {
                    for (SellerTransaction transaction : sellerTransactions) {
                        out.println("<tr>");
                        out.println("<td>" + transaction.getItemNo() + "</td>");
                        
                        // Fetch item details based on itemNo
                        Item item = ItemService.getItemDetails(transaction.getItemNo());
                        if (item != null) {
                            out.println("<td><a href='ViewItemServlet?itemNo=" + transaction.getItemNo() + "'>" + item.getTitle() + "</a></td>");
                        } else {
                            out.println("<td>Item Not Found</td>");
                        }
                        out.println("<td>" + transaction.getSaleAmount() + "</td>");
                        out.println("<td>" + transaction.getSellerName() + "</td>");
                        out.println("<td>" + transaction.getStatus() + "</td>");
                        out.println("<td>" + transaction.getTimestamp() + "</td>");
                        out.println("<td>");
                        if ("Completed".equals(transaction.getStatus())) {
                        	out.println("Awaiting Buyer to pay");
                        } else if ("Payment Made".equals(transaction.getStatus()))
                        {
                        	 out.println("<form action='ShippingItemServlet' method='get'>");
                             out.println("<input type='hidden' name='transactionID' value='" + transaction.getTransactionID() + "'>");
                             out.println("<input type='hidden' name='itemNo' value='" + transaction.getItemNo() + "'>");
                             out.println("<input type='hidden' name='sellerAddress' value='" + transaction.getSellerAddress() + "'>");
                             out.println("<button type='submit'>Send item to Buyer</button>");
                             out.println("</form>");
                        } else if ("Item Received".equals(transaction.getStatus()))
                        {
                        	out.println("Auction Concluded");
                        }else if ("Item Shipped".equals(transaction.getStatus()))
                        {
                        	out.println("Awaiting Buyer Confirmation");
                        }
                     
                        out.println("</td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>

    <h1>My Closed Items</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Item No</th>
                <th>Title</th>
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
                List<Item> closedItems = (List<Item>) request.getAttribute("closedItems");
                if (closedItems != null) {
                    for (Item item : closedItems) {
                        out.println("<tr>");
                        out.println("<td>" + item.getItemNo() + "</td>");
                        out.println("<td>" + item.getTitle() + "</td>");
                        out.println("<td>" + item.getCategory().getCatName() + "</td>");
                        out.println("<td>" + item.getCondition() + "</td>");
                        out.println("<td>" + item.getDescription() + "</td>");
                        out.println("<td>" + item.getStartDate() + "</td>");
                        out.println("<td>" + item.getEndDate() + "</td>");
                        out.println("<td>" + item.getStartPrice() + "</td>");
                        out.println("<td>" + item.getMinSellPrice() + "</td>");
                        out.println("<td>" + item.getListingStatus() + "</td>");
                        
                        byte[] imageData = item.getImage();
                        if (imageData != null) {
                            String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                            out.println("<td><img src=\"" + base64Image + "\" alt=\"Item Image\" style=\"max-width: 100px; max-height: 100px;\"></td>");
                        } else {
                            out.println("<td>No Image Available</td>");
                        }

                        out.println("<td><a href='ViewItemServlet?itemNo=" + item.getItemNo() + "'>View Item</a></td>");
                        out.println("</tr>");
                    }
                }
            %>
        </tbody>
    </table>
</body>
</html>
