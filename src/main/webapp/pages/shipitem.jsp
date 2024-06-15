<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Ship Item</title>
</head>
<body>
    <h1>Ship Item</h1>
    <p>Buyer Address: <%=request.getAttribute("buyerAddress")%></p>
    <form action="ShippingItemServlet" method="post">
        <input type="hidden" name="transactionID" value="<%=request.getAttribute("transactionID")%>" />
        <input type="submit" value="I have Shipped out the item" />
    </form>
   
    <a href="pages/viewallbids.jsp">Go Back to Items List</a>
</body>
</html>
