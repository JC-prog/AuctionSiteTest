<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Item, com.model.Bid" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Item</title>
    <script>
        // Countdown timer script
        function startCountdown(endDate) {
            var countdownElement = document.getElementById('countdown');
            var end = new Date(endDate).getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = end - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                if (distance < 0) {
                    clearInterval(x);
                    countdownElement.innerHTML = "EXPIRED";
                }
            }, 1000);
        }
    </script>
</head>
<body>
    <h1>Item Details</h1>
    <%
        Item item = (Item) request.getAttribute("item");
        List<Bid> bidList = (List<Bid>) request.getAttribute("bidList");
        String watchlistMessage = (String) request.getAttribute("watchlistMessage"); //show watchlist added success or fail
        boolean isBidSuccessful = request.getAttribute("isBidSuccessful") != null && (boolean) request.getAttribute("isBidSuccessful");
        String errorMessage = (String) request.getAttribute("errorMessage");
        String currentUser = (String) session.getAttribute("uName"); // Assuming the user is logged in and you have the username
        String currentUserID = (String) session.getAttribute("uID");
        
        if (item != null) {
    %>
    <table border="1">
        <tr><th>Title</th><td><%= item.getTitle() %></td></tr>
        <tr><th>Description</th><td><%= item.getDescription() %></td></tr>
        <tr><th>Start Date</th><td><%= item.getStartDate() %></td></tr>
        <tr><th>End Date</th><td><%= item.getEndDate() %></td></tr>
        <tr><th>Start Price</th><td><%= item.getStartPrice() %></td></tr>
        <tr><th>Min Sell Price</th><td><%= item.getMinSellPrice() %></td></tr>
        <tr><th>Seller Name</th><td><%= item.getSeller().getuName() %></td></tr>

    </table>
    <% byte[] imageData = item.getImage();
                        if (imageData != null) {
                            String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                            out.println("<td><img src=\"" + base64Image + "\" alt=\"Item Image\" style=\"max-width: 100px; max-height: 100px;\"></td>");
                        } else {
                            out.println("<td>No Image Available</td>");
                        }%>
    <h2>Time Remaining</h2>
    <div id="countdown"></div>
    <script>startCountdown('<%= item.getEndDate() %>');</script>

    <h2>Bid History</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Bidder Name</th>
                <th>Bid Amount</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            <%
                boolean isHighestBidder = false;
                if (bidList != null && !bidList.isEmpty()) {
                	int i = 0; //for loop index to check if first item in the list, am i the highest bidder. if im not, then fk it
                	
                	
                    for (Bid bid : bidList) {
                        if (i == 0 && bid.getBidderID().equals(currentUserID) && bid.getBidAmount().compareTo(item.getStartPrice()) > 0) {
                            isHighestBidder = true;
                        }
                        out.println("<tr>");
                        out.println("<td>" + bid.getBidderName() + "</td>");
                        out.println("<td>" + bid.getBidAmount() + "</td>");
                        out.println("<td>" + bid.getTimestamp() + "</td>");
                        out.println("</tr>");
                        i++;
                    } 
                } else {
                    out.println("<tr><td colspan='3'>No current bids.</td></tr>");
                }
            %>
        </tbody>
    </table>
    <% if (isHighestBidder) { %>
        <p>You are the current highest bidder.</p>
    <% } %>

    <% if (isBidSuccessful) { %>
        <p>Your bid was placed successfully!</p>
    <% } else if (errorMessage != null) { %>
        <p style="color: red;"><%= errorMessage %></p>
    <% } %>
    
	<% if (watchlistMessage != null) { %>
        <p><%= watchlistMessage %></p>
    <% } %>

    <h2>Place a Bid</h2>
    <form action="placebid" method="get">
        <input type="hidden" name="itemNo" value="<%= item.getItemNo() %>" />
        <label for="bidAmount">Bid Amount:</label>
        <input type="text" id="bidAmount" name="bidAmount" required />
        <button type="submit">Place Bid</button>
    </form>
     <h2>Add to Watchlist</h2>
    <form action="AddToWatchlistServlet" method="get">
        <input type="hidden" name="itemNo" value="<%= item.getItemNo() %>" />
        <button type="submit">Add to Watchlist</button>
    </form>
    <% } else { %>
        <p>Item not found.</p>
    <% } %>
</body>
</html>
