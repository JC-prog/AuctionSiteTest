<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.model.Item, com.model.ItemCategory, com.model.AuctionType, com.model.DurationPreset,java.util.List" %>
<%
    Item item = (Item) request.getAttribute("item");
    List<ItemCategory> categories = (List<ItemCategory>) request.getAttribute("categories");
    List<AuctionType> auctionTypes = (List<AuctionType>) request.getAttribute("auctionTypes");
    List<DurationPreset> durations = (List<DurationPreset>) request.getAttribute("durations");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Item</title>
    <script>
        function toggleFields() {
            const listingStatus = document.getElementById("listingStatus").value;
            const isPublish = listingStatus === "Publish";

            document.getElementById("title").disabled = isPublish;
            document.getElementById("category").disabled = isPublish;
            document.getElementById("auctionType").disabled = isPublish;
            document.getElementById("durationPreset").disabled = isPublish;
            document.getElementById("startPrice").disabled = isPublish;
            document.getElementById("listingStatus").disabled = isPublish;
            document.getElementById("minSellPrice").disabled = isPublish;
        }

        window.onload = function() {
            toggleFields();
        }
    </script>
</head>
<body>
    <h1>Edit Item</h1>
    <form action="EditItemServlet" method="post" enctype="multipart/form-data">
        <input type="hidden" id="itemNo" name="itemNo" value="<%= item.getItemNo() %>">

        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="<%= item.getTitle() %>"><br>

        <label for="category">Category:</label>
        <select id="category" name="category">
            <% 
                for (ItemCategory category : categories) {
                    boolean selected = category.getCategoryNo() == item.getCategory().getCategoryNo();
                    out.println("<option value='" + category.getCategoryNo() + "'" + (selected ? " selected" : "") + ">" + category.getCatName() + "</option>");
                }
            %>
        </select><br>

        <label for="condition">Condition:</label>
        <input type="text" id="condition" name="condition" value="<%= item.getCondition() %>"><br>

        <label for="description">Description:</label>
        <textarea id="description" name="description"><%= item.getDescription() %></textarea><br>

        <label for="auctionType">Auction Type:</label>
        <select id="auctionType" name="auctionType">
            <% 
                for (AuctionType auctionType : auctionTypes) {
                    boolean selected = auctionType.getAuctionTypeID() == item.getAuctionType().getAuctionTypeID();
                    out.println("<option value='" + auctionType.getAuctionTypeID() + "'" + (selected ? " selected" : "") + ">" + auctionType.getName() + "</option>");
                }
            %>
        </select><br>

        <label for="durationPreset">Duration:</label>
        <select id="durationPreset" name="durationPreset">
            <% 
                for (DurationPreset duration : durations) {
                    boolean selected = duration.getDurationID() == item.getDurationPreset().getDurationID();
                    out.println("<option value='" + duration.getDurationID() + "'" + (selected ? " selected" : "") + ">" + duration.getName() + "</option>");
                }
            %>
        </select><br>

        <label for="startPrice">Start Price:</label>
        <input type="number" step="0.01" id="startPrice" name="startPrice" value="<%= item.getStartPrice() %>"><br>

        <label for="minSellPrice">Min Sell Price:</label>
        <input type="number" step="0.01" id="minSellPrice" name="minSellPrice" value="<%= item.getMinSellPrice() %>"><br>

        <label for="listingStatus">Listing Status:</label>
        <select name="listingStatus" id="listingStatus">
            <option value="Draft" <%= "Draft".equals(item.getListingStatus()) ? "selected" : "" %>>Draft</option>
            <option value="Publish" <%= "Publish".equals(item.getListingStatus()) ? "selected" : "" %>>Publish</option>
        </select><br>

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
