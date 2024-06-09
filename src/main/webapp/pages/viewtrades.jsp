<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.List, com.model.TradeRequest" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Trade Requests</title>
</head>
<body>
    <h1>Your Trade Requests</h1>
    
    <table border="1">
        <thead>
            <tr>
                <th>Trade ID</th>
                <th>Buyer Item</th>
                <th>Seller Item</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        <% 
        	String currentUserID = (String) session.getAttribute("uID");
        	List<TradeRequest> traderequest = (List<TradeRequest>) request.getAttribute("tradeRequests");
        	if(traderequest != null){
        		for(TradeRequest item : traderequest)
        		{
        			 out.println("<tr>");
                     out.println("<td>" + item.getTradeID() + "</td>");
                     out.println("<td><a href='ViewItemServlet?itemNo=" + item.getBuyerItemID() + "'>" + item.getBuyerItemTitle() + "</a></td>");
                     out.println("<td><a href='ViewItemServlet?itemNo=" + item.getSellerItemID() + "'>" + item.getSellerItemTitle() + "</a></td>");
                     out.println("<td>" + item.getStatus() + "</td>");
                     out.println("<td>" + item.getTimestamp() + "</td>");
                     
                     // Form for actions column based on conditions
                     out.println("<td>");
                     if (currentUserID.equals(item.getSellerID()) && item.getStatus().equals("Pending")) {
                        // If seller item belongs to current user and status is Pending, display Accept and Reject actions
                        out.println("<form action='ViewTradeRequestsServlet' method='post'>");
                        out.println("<input type='hidden' name='tradeID' value='" + item.getTradeID() + "'>");
                        out.println("<input type='submit' name='action' value='Accept'>");
                        
                        out.println("<form action='ViewTradeRequestsServlet' method='post'>");
                        out.println("<input type='hidden' name='tradeID' value='" + item.getTradeID() + "'>");
                        out.println("<input type='submit' name='action' value='Reject'>");
                        out.println("</form>");
                     } else if (currentUserID.equals(item.getBuyerID()) && item.getStatus().equals("Pending")) {
                        // If buyer item belongs to current user, display Cancel action
                        out.println("<form action='ViewTradeRequestsServlet' method='post'>");
                        out.println("<input type='hidden' name='tradeID' value='" + item.getTradeID() + "'>");
                        out.println("<input type='submit' name='action' value='Cancel'>");
                        out.println("</form>");
                     } else {
                        // If none of the above conditions are met, display N/A
                        out.println("N/A");
                     }
                     out.println("</td>");
                     
                     out.println("</tr>");
        		}
        		
        	}else
        	{
        		 out.println("<tr><td colspan='6'>No items in your trade requests.</td></tr>");
        	}
        %>
       
        </tbody>
    </table>
</body>
</html>
