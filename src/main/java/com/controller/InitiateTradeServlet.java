package com.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.AuctionType;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/InitiateTradeServlet")
public class InitiateTradeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String currentUserID = (String) session.getAttribute("uID");
        String sellerUserID = request.getParameter("selleruID");
        String sellerName = request.getParameter("sellerName");
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        // You can fetch the user's items from the database here if needed
        // List<Item> userItems = yourMethodToFetchUserItemsFromDatabase(currentUserID);
        List<Item> userItems = new ArrayList<>();
        
        try {
            // Establish database connection
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);

            // Prepare SQL statement to retrieve items listed by the current user
            String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                    "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description, " +
                    "a.auctionTypeID, a.name AS auctionTypeName, " +
                    "d.durationID, d.name AS durationPresetName, d.hours, " +
                    "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                    "FROM Item i " +
                    "JOIN User u ON i.sellerID = u.uID " +
                    "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                    "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                    "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                    "WHERE i.sellerID = ? AND i.isActive = TRUE AND i.listingStatus = 'Publish'";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, currentUserID);
            ResultSet rs = stmt.executeQuery();

            // Iterate through the result set and populate the userItems list
            while (rs.next()) {
                Item item = new Item();
                // Populate item details from the result set
                item.setItemNo(rs.getInt("itemNo"));
                item.setTitle(rs.getString("title"));
                RegisterClass seller = new RegisterClass();
                seller.setuId(rs.getString("sellerID"));
                seller.setuName(rs.getString("sellerName"));
                seller.setuMail(rs.getString("sellerEmail"));
                item.setSeller(seller);

                item.setTitle(rs.getString("title"));

                ItemCategory category = new ItemCategory(rs.getInt("categoryNo"),rs.getString("categoryName"),true);
                //ItemCategory category = new ItemCategory();
                //category.setCategoryNo(rs.getInt("categoryNo"));
                //category.setCatName(rs.getString("categoryName"));
                item.setCategory(category);

                item.setCondition(rs.getString("condition"));
                item.setDescription(rs.getString("description"));

                AuctionType auctionType = new AuctionType();
                auctionType.setAuctionTypeID(rs.getInt("auctionTypeID"));
                auctionType.setName(rs.getString("auctionTypeName"));
                item.setAuctionType(auctionType);

                DurationPreset durationPreset = new DurationPreset(rs.getInt("durationID"),rs.getString("durationPresetName"),rs.getInt("hours"),true);
                //DurationPreset durationPreset = new DurationPreset();
                //durationPreset.setDurationID(rs.getInt("durationID"));
                //durationPreset.setName(rs.getString("durationPresetName"));
                //durationPreset.setHours(rs.getInt("hours"));
                item.setDurationPreset(durationPreset);

                item.setStartDate(rs.getTimestamp("startDate"));
                item.setEndDate(rs.getTimestamp("endDate"));
                item.setStartPrice(rs.getBigDecimal("startPrice"));
                item.setMinSellPrice(rs.getBigDecimal("minSellPrice"));
                item.setListingStatus(rs.getString("listingStatus"));
                item.setActive(rs.getBoolean("isActive"));
                // Retrieve image blob
                Blob imageBlob = rs.getBlob("image");
                if (imageBlob != null) {
                    byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
                    item.setImage(imageBytes);
                }

                
                userItems.add(item);
            }

            // Close result set, statement, and connection
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            // Handle exceptions
        }
        
        request.setAttribute("userItems", userItems);
        request.setAttribute("sellerUserID", sellerUserID);
        request.setAttribute("sellerName", sellerName);
        request.setAttribute("itemNo", itemNo);
        System.out.println("doGET InititateTradeServ");
        // request.setAttribute("userItems", userItems);
        request.getRequestDispatcher("/pages/tradeitem.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String currentUserID = (String) session.getAttribute("uID");
        String sellerUserID = request.getParameter("selleruID");
        int sellerItemNo = Integer.parseInt(request.getParameter("sellerItemNo"));
        int buyerItemNo = Integer.parseInt(request.getParameter("buyerItemNo"));

        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        // SQL to check if a similar trade request already exists
        String checkSql = "SELECT COUNT(*) FROM TradeRequest WHERE buyerID = ? AND sellerID = ? AND buyerItemID = ? AND sellerItemID = ? AND isActive = TRUE";

        try (Connection connection = DriverManager.getConnection(url, user, password);
             PreparedStatement checkStmt = connection.prepareStatement(checkSql)) {

            checkStmt.setString(1, currentUserID);
            checkStmt.setString(2, sellerUserID);
            checkStmt.setInt(3, buyerItemNo);
            checkStmt.setInt(4, sellerItemNo);

            ResultSet rs = checkStmt.executeQuery();
            if (rs.next() && rs.getInt(1) > 0) {
                // If a similar trade request already exists, return an error message
                response.sendRedirect("tradeitem.jsp?status=duplicate");
            } else {
            	
            	System.out.println("Seller ID = " +sellerUserID);
                // Insert new trade request
                String insertSql = "INSERT INTO TradeRequest (buyerID, sellerID, buyerItemID, sellerItemID, timestamp, status, isActive) VALUES (?, ?, ?, ?, NOW(), 'Pending', ?)";
                try (PreparedStatement insertStmt = connection.prepareStatement(insertSql)) {
                    insertStmt.setString(1, currentUserID);
                    insertStmt.setString(2, sellerUserID);
                    insertStmt.setInt(3, buyerItemNo);
                    insertStmt.setInt(4, sellerItemNo);
                    insertStmt.setBoolean(5, true);

                    int rowsAffected = insertStmt.executeUpdate();
        	        //request.getRequestDispatcher("ViewTradeRequestsServlet").forward(request, response);
                    
                    response.sendRedirect("ViewTradeRequestsServlet");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("tradeitem.jsp?status=error");
        }
    }
}