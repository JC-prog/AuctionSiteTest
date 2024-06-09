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
            String sql = "SELECT i.ItemNo, i.Title, i.SellerID, u.uName AS SellerName, u.uMail AS SellerEmail, " +
                    "c.CategoryNo, c.CatName AS CategoryName, i.`Condition`, i.Description, " +
                    "a.AuctionTypeID, a.Name AS AuctionTypeName, " +
                    "d.DurationID, d.Name AS DurationPresetName, d.Hours, " +
                    "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.ListingStatus, i.isActive, i.Image " +
                    "FROM Item i " +
                    "JOIN User u ON i.SellerID = u.uID " +
                    "JOIN ItemCategory c ON i.CategoryNo = c.CategoryNo " +
                    "JOIN AuctionType a ON i.AuctionType = a.AuctionTypeID " +
                    "JOIN DurationPreset d ON i.DurationPreset = d.DurationID " +
                    "WHERE i.SellerID = ? AND i.isActive = TRUE";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, currentUserID);
            ResultSet rs = stmt.executeQuery();

            // Iterate through the result set and populate the userItems list
            while (rs.next()) {
                Item item = new Item();
                // Populate item details from the result set
                item.setItemNo(rs.getInt("ItemNo"));
                item.setTitle(rs.getString("Title"));
                RegisterClass seller = new RegisterClass();
                seller.setuId(rs.getString("SellerID"));
                seller.setuName(rs.getString("SellerName"));
                seller.setuMail(rs.getString("SellerEmail"));
                item.setSeller(seller);

                item.setTitle(rs.getString("Title"));

                ItemCategory category = new ItemCategory();
                category.setCategoryNo(rs.getInt("CategoryNo"));
                category.setCatName(rs.getString("CategoryName"));
                item.setCategory(category);

                item.setCondition(rs.getString("Condition"));
                item.setDescription(rs.getString("Description"));

                AuctionType auctionType = new AuctionType();
                auctionType.setAuctionTypeID(rs.getInt("AuctionTypeID"));
                auctionType.setName(rs.getString("AuctionTypeName"));
                item.setAuctionType(auctionType);

                DurationPreset durationPreset = new DurationPreset();
                durationPreset.setDurationID(rs.getInt("DurationID"));
                durationPreset.setName(rs.getString("DurationPresetName"));
                durationPreset.setHours(rs.getInt("Hours"));
                item.setDurationPreset(durationPreset);

                item.setStartDate(rs.getTimestamp("startDate"));
                item.setEndDate(rs.getTimestamp("endDate"));
                item.setStartPrice(rs.getBigDecimal("startPrice"));
                item.setMinSellPrice(rs.getBigDecimal("minSellPrice"));
                item.setListingStatus(rs.getString("ListingStatus"));
                item.setActive(rs.getBoolean("isActive"));
                // Retrieve image blob
                Blob imageBlob = rs.getBlob("Image");
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
        String checkSql = "SELECT COUNT(*) FROM TradeRequest WHERE BuyerID = ? AND SellerID = ? AND BuyerItemID = ? AND SellerItemID = ? AND isActive = TRUE";

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
                String insertSql = "INSERT INTO TradeRequest (BuyerID, SellerID, BuyerItemID, SellerItemID, Timestamp, Status, isActive) VALUES (?, ?, ?, ?, NOW(), 'Pending', ?)";
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