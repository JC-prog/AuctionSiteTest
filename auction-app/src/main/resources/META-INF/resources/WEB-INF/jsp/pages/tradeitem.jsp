<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List, com.model.Item" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Initiate Trade</title>
</head>
<body>
    <h1>Initiate Trade</h1>
    <%
        String currentUserID = (String) session.getAttribute("uID");
    	String selleruID = request.getParameter("SelleruID");
    	String sellerName = request.getParameter("SelleruName");
    	int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        List<Item> userItems = (List<Item>) request.getAttribute("userItems");
       
    %>
    <% 
        String status = request.getParameter("status");
        if ("duplicate".equals(status)) { 
    %>
        <p style="color: red;">A similar trade request already exists. Please choose different items.</p>
    <% 
        } else if ("error".equals(status)) { 
    %>
        <p style="color: red;">An error occurred while processing your trade request. Please try again.</p>
    <% 
        } 
    %>
    <form action="InitiateTradeServlet" method="post">
        <input type="hidden" name="sellerItemNo" value="<%= itemNo %>" />
        <table border="1">
            <thead>
                <tr>
                    <th>Item No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Select</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                <%
                    if (userItems != null) {
                        for (Item item : userItems) {
                            if (item.getSeller().getuId().equals(currentUserID) && item.isActive()) {
                                out.println("<tr>");
                                out.println("<td>" + item.getItemNo() + "</td>");
                                out.println("<td>" + item.getTitle() + "</td>");
                                out.println("<td>" + item.getDescription() + "</td>");
                                out.println("<td><input type='radio' name='buyerItemNo' value='" + item.getItemNo() + "' required /></td>");
                                // Display image if available
                                byte[] imageData = item.getImage();
                                if (imageData != null) {
                                    String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                                    out.println("<td><img src=\"" + base64Image + "\" alt=\"Item Image\" style=\"max-width: 100px; max-height: 100px;\"></td>");
                                } else {
                                    out.println("<td>No Image Available</td>");
                                }
                                out.println("</tr>");
                            }
                        }
                    } else {
                        out.println("<tr><td colspan='3'>You have no active listed items.</td></tr>");
                    }
                %>
            </tbody>
        </table>
        <input type="hidden" name="selleruID" value= <%=selleruID%> />
        <input type="hidden" name="sellerName" value=<%=sellerName%> />
        <button type="submit">Initiate Trade</button>
    </form>
</body>
</html>
