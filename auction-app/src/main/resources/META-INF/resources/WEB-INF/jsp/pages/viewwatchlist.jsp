<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Watchlist" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Watchlist</title>
</head>
<body>
    <h1>Your Watchlist</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Watchlist ID</th>
                <th>Item No</th>
                <th>Timestamp</th>
                <th>Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Watchlist> watchlist = (List<Watchlist>) request.getAttribute("watchlist");
                if (watchlist != null) {
                    for (Watchlist item : watchlist) {
                        out.println("<tr>");
                        out.println("<td>" + item.getWatchlistID() + "</td>");
                        out.println("<td>" + item.getItemNo() + "</td>");
                        out.println("<td>" + item.getTimestamp() + "</td>");
                        out.println("<td>" + item.isActive() + "</td>");
                        out.println("<td>");
                        out.println("<form action='ViewItemServlet' method='get' style='display:inline;'>");
                        out.println("<input type='hidden' name='itemNo' value='" + item.getItemNo() + "' />");
                        out.println("<button type='submit'>View Item</button>");
                        out.println("</form>");
                        out.println("<form action='RemoveFromWatchlistServlet' method='get' style='display:inline;'>");
                        out.println("<input type='hidden' name='watchlistID' value='" + item.getWatchlistID() + "' />");
                        out.println("<button type='submit'>Remove</button>");
                        out.println("</form>");
                        out.println("</td>");
                        out.println("</tr>");
                    }
                } else {
                    out.println("<tr><td colspan='5'>No items in your watchlist.</td></tr>");
                }
            %>
        </tbody>
    </table>
    <form action="ListItemsServlet" method="get">
        <button type="submit">Back to Item Listings</button>
    </form>
</body>
</html>
