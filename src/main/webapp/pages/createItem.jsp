<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.sql.*, java.util.*" %>
<%
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    List<Map<String, Object>> categories = new ArrayList<>();
    List<Map<String, Object>> auctionTypes = new ArrayList<>();
    List<Map<String, Object>> durations = new ArrayList<>();
 
    try {
        // Database connection details
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
        conn = DriverManager.getConnection(url, user, password);
        stmt = conn.createStatement();

        // Fetch categories
        rs = stmt.executeQuery("SELECT CategoryNo, CatName FROM ItemCategory WHERE isActive = true");
     
        while (rs.next()) {
            Map<String, Object> category = new HashMap<>();
            category.put("CategoryNo", rs.getInt("CategoryNo"));
            category.put("CatName", rs.getString("CatName"));
            categories.add(category);
        }

        // Fetch auction types
        rs = stmt.executeQuery("SELECT AuctionTypeID, Name FROM AuctionType WHERE isActive = true");
        
        while (rs.next()) {
            Map<String, Object> auctionType = new HashMap<>();
            auctionType.put("AuctionTypeID", rs.getInt("AuctionTypeID"));
            auctionType.put("Name", rs.getString("Name"));
            auctionTypes.add(auctionType);
        }

        // Fetch duration presets
        rs = stmt.executeQuery("SELECT DurationID, Name,Hours FROM DurationPreset WHERE isActive = true");
        
        while (rs.next()) {
            Map<String, Object> duration = new HashMap<>();
            duration.put("DurationID", rs.getInt("DurationID"));
            duration.put("Name", rs.getString("Name"));
            durations.add(duration);
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
    <title>Create Item Listing</title>
</head>
<body>
    <h1>Create Item Listing</h1>
    <form action="createItem" method="post" enctype="multipart/form-data" onsubmit="return validateForm()">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required><br>

        <label for="category">Category:</label>
      <select id="category" name="category" required>
            <% 
                for (Map<String, Object> category : categories) {
                    int categoryNo = (int) category.get("CategoryNo");
                    String catName = (String) category.get("CatName");
                    out.println("<option value='" + categoryNo + "'>" + catName + "</option>");
                }
            %>
        </select><br>

        <label for="condition">Condition:</label>
        <input type="text" id="condition" name="condition" required><br>

        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea><br>

        <label for="auctionType">Auction Type:</label>
        <select id="auctionType" name="auctionType" required>
            <%
                for (Map<String, Object> auctionType : auctionTypes) {
                    int auctionTypeID = (int) auctionType.get("AuctionTypeID");
                    String name = (String) auctionType.get("Name");
                    out.println("<option value='" + auctionTypeID + "'>" + name + "</option>");
                }
            %>
        </select><br>

        <label for="durationPreset">Duration:</label>
		<select id="durationPreset" name="durationPreset" required>
		    <% for (Map<String, Object> duration : durations) {
		           int durationID = (int) duration.get("DurationID");
		           String name = (String) duration.get("Name");
		           out.println("<option value='" + durationID + "'>" + name + "</option>");
		       }
		    %>
		</select>

		<label for="image">Image:</label>
        <input type="file" id="image" name="image" required><br><br>


      <!--   <label for="startDate">Start Date:</label>
        <input type="datetime-local" id="startDate" name="startDate" required><br>

        <label for="endDate">End Date:</label>
        <input type="datetime-local" id="endDate" name="endDate" required><br>
 -->
        <label for="startPrice">Start Price:</label>
        <input type="number" step="0.01" id="startPrice" name="startPrice" required><br>

        <label for="minSellPrice">Min Sell Price:</label>
        <input type="number" step="0.01" id="minSellPrice" name="minSellPrice" required><br>

        <label for="listingStatus">Listing Status:</label>
        <select name="listingStatus" id="listingStatus">
		  <option value="Draft">Draft</option>
		  <option value="Publish">Publish</option>
		</select>

        <input type="submit" value="Create Listing">
    </form>
    <script>
        function validateForm() {
            // Additional custom validation if needed
            
            // Example: Ensure start date is before end date
            var startDate = new Date(document.getElementById("startDate").value);
            var endDate = new Date(document.getElementById("endDate").value);
            if (startDate >= endDate) {
                alert("End date must be after start date.");
                return false;
            }

            return true; // Submit the form if all validation checks pass
        }
    </script>
</body>
</html>
