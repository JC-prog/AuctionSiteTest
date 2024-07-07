<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.model.Item, com.model.ItemCategory, com.model.AuctionType, com.model.DurationPreset,com.model.Condition, java.util.List" %>
<%@ page import="java.sql.*, java.util.*" %>
<%
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
    Item item = (Item) request.getAttribute("item");
	List<Map<String, Object>> categories = new ArrayList<>();
	List<Map<String, Object>> auctionTypes = new ArrayList<>();
	List<Map<String, Object>> durations = new ArrayList<>();
	List<Map<String, Object>> conditions = new ArrayList<>();
	
	try {
	    // Database connection details
	    String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
	    String user = "root";
	    String password = "password";
	    conn = DriverManager.getConnection(url, user, password);
	    stmt = conn.createStatement();

	    // Fetch categories
	    rs = stmt.executeQuery("SELECT categoryNo, catName FROM ItemCategory WHERE isActive = true");
	    while (rs.next()) {
	        Map<String, Object> category = new HashMap<>();
	        category.put("CategoryNo", rs.getInt("categoryNo"));
	        category.put("CatName", rs.getString("catName"));
	        categories.add(category);
	    }

	    // Fetch auction types
	    rs = stmt.executeQuery("SELECT auctionTypeID, name FROM AuctionType WHERE isActive = true");
	    while (rs.next()) {
	        Map<String, Object> auctionType = new HashMap<>();
	        auctionType.put("AuctionTypeID", rs.getInt("auctionTypeID"));
	        auctionType.put("Name", rs.getString("name"));
	        auctionTypes.add(auctionType);
	    }

	    // Fetch duration presets
	    rs = stmt.executeQuery("SELECT durationID, name FROM DurationPreset WHERE isActive = true");
	    while (rs.next()) {
	        Map<String, Object> duration = new HashMap<>();
	        duration.put("DurationID", rs.getInt("durationID"));
	        duration.put("Name", rs.getString("name"));
	        durations.add(duration);
	    }

	    // Fetch conditions
	    rs = stmt.executeQuery("SELECT conditionID, name FROM ItemCondition WHERE isActive = true");
	    while (rs.next()) {
	        Map<String, Object> condition = new HashMap<>();
	        condition.put("ConditionID", rs.getInt("conditionID"));
	        condition.put("Name", rs.getString("name"));
	        conditions.add(condition);
	    }
	} catch (SQLException e) {
	    throw new ServletException(e);
	} finally {
	    if (rs != null) try { rs.close(); } catch (SQLException ignore) {}
	    if (stmt != null) try { stmt.close(); } catch (SQLException ignore) {}
	    if (conn != null) try { conn.close(); } catch (SQLException ignore) {}
	}
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Item</title>
    
</head>
<body>
    <h1>Edit Item</h1>
    <form action="AdminEditItemServlet" method="post" enctype="multipart/form-data">
        <input type="hidden" id="itemNo" name="itemNo" value="<%= item.getItemNo() %>">

        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="<%= item.getTitle() %>"><br>

        <label for="sellerID">Seller ID:</label>
        <input type="text" id="sellerID" name="sellerID" value="<%= item.getSeller().getuId() %>" readonly><br>

        <label for="category">Category:</label>
        <select id="category" name="category">
            <% 
                for (Map<String, Object> category : categories) {
                    int categoryNo = (int) category.get("CategoryNo");
                    String catName = (String) category.get("CatName");
                    boolean selected = categoryNo == item.getCategory().getCategoryNo();
                    out.println("<option value='" + categoryNo + "'" + (selected ? " selected" : "") + ">" + catName + "</option>");
                }
            %>
        </select><br>

        <label for="condition">Condition:</label>
        <select id="condition" name="condition">
            <% 
                for (Map<String, Object> condition : conditions) {
                    int conditionID = (int) condition.get("ConditionID");
                    String name = (String) condition.get("Name");
                    boolean selected = conditionID == item.getCondition().getConditionID();
                    out.println("<option value='" + conditionID + "'" + (selected ? " selected" : "") + ">" + name + "</option>");
                }
            %>
        </select><br>

        <label for="description">Description:</label>
        <textarea id="description" name="description"><%= item.getDescription() %></textarea><br>

        <label for="auctionType">Auction Type:</label>
        <select id="auctionType" name="auctionType">
            <%
                for (Map<String, Object> auctionType : auctionTypes) {
                    int auctionTypeID = (int) auctionType.get("AuctionTypeID");
                    String name = (String) auctionType.get("Name");
                    boolean selected = auctionTypeID == item.getAuctionType().getAuctionTypeID();
                    out.println("<option value='" + auctionTypeID + "'" + (selected ? " selected" : "") + ">" + name + "</option>");
                }
            %>
        </select><br>

        <label for="durationPreset">Duration:</label>
        <select id="durationPreset" name="durationPreset">
            <% 
                for (Map<String, Object> duration : durations) {
                    int durationID = (int) duration.get("DurationID");
                    String name = (String) duration.get("Name");
                    boolean selected = durationID == item.getDurationPreset().getDurationID();
                    out.println("<option value='" + durationID + "'" + (selected ? " selected" : "") + ">" + name + "</option>");
                }
            %>
        </select><br>

        <label for="startDate">Start Date:</label>
        <input type="datetime-local" id="startDate" name="startDate" value="<%= item.getStartDate().toString().substring(0, 16) %>"><br>

        <label for="endDate">End Date:</label>
        <input type="datetime-local" id="endDate" name="endDate" value="<%= item.getEndDate().toString().substring(0, 16) %>"><br>

        <label for="startPrice">Start Price:</label>
        <input type="number" step="0.01" id="startPrice" name="startPrice" value="<%= item.getStartPrice() %>"><br>

        <label for="minSellPrice">Min Sell Price:</label>
        <input type="number" step="0.01" id="minSellPrice" name="minSellPrice" value="<%= item.getMinSellPrice() %>"><br>

        <label for="listingStatus">Listing Status:</label>
        <select name="listingStatus" id="listingStatus" >
            <option value="Draft" <%= "Draft".equals(item.getListingStatus()) ? "selected" : "" %>>Draft</option>
            <option value="Publish" <%= "Publish".equals(item.getListingStatus()) ? "selected" : "" %>>Publish</option>
        </select><br>

        <label for="isActive">Active:</label>
        <input type="checkbox" id="isActive" name="isActive" <%= item.isActive() ? "checked" : "" %>><br>

        <label for="image">Image:</label>
        <input type="file" id="image" name="image"><br><br>
        <% 
            byte[] imageData = item.getImage();
            if (imageData != null) {
                String base64Image = "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
                out.println("<img src=\"" + base64Image + "\" alt=\"Item Image\" style=\"max-width: 100px; max-height: 100px;\">");
            } else {
                out.println("<p>No Image Available</p>");
            }
        %>

        <button type="submit">Update</button>
    </form>
</body>
</html>
