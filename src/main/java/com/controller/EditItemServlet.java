package com.controller;
import com.model.AuctionType;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.Connection;
import java.util.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

@MultipartConfig
@WebServlet("/EditItemServlet")
public class EditItemServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String itemNo = request.getParameter("itemNo");
        Item item = getItemByItemNo(itemNo); // Implement this method to fetch item details by item number

        request.setAttribute("item", item);
        request.getRequestDispatcher("/pages/edititem.jsp").forward(request, response);
    }

    private Item getItemByItemNo(String itemNo) throws ServletException {
        // Implement database logic to fetch item details by item number
        // For demonstration purposes, returning a dummy item
        Item item = new Item();
        
        try {
            // Database connection details
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);

            // Retrieve item details
            String itemSql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                             "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description, " +
                             "a.auctionTypeID, a.name AS auctionTypeName, " +
                             "d.durationID, d.name AS durationPresetName, d.hours, " +
                             "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                             "FROM Item i " +
                             "JOIN User u ON i.sellerID = u.uID " +
                             "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                             "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                             "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                             "WHERE i.itemNo = ?";

            PreparedStatement stmt = conn.prepareStatement(itemSql);
            stmt.setString(1, itemNo);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                item = new Item();
                item.setItemNo(rs.getInt("itemNo"));

                RegisterClass seller = new RegisterClass();
                seller.setuId(rs.getString("sellerID"));
                seller.setuName(rs.getString("sellerName"));
                seller.setuMail(rs.getString("sellerEmail"));
                item.setSeller(seller);

                item.setTitle(rs.getString("title"));

                ItemCategory category = new ItemCategory();
                category.setCategoryNo(rs.getInt("categoryNo"));
                category.setCatName(rs.getString("categoryName"));
                item.setCategory(category);

                item.setCondition(rs.getString("condition"));
                item.setDescription(rs.getString("description"));

                AuctionType auctionType = new AuctionType();
                auctionType.setAuctionTypeID(rs.getInt("auctionTypeID"));
                auctionType.setName(rs.getString("auctionTypeName"));
                item.setAuctionType(auctionType);

                DurationPreset durationPreset = new DurationPreset();
                durationPreset.setDurationID(rs.getInt("durationID"));
                durationPreset.setName(rs.getString("durationPresetName"));
                durationPreset.setHours(rs.getInt("hours"));
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
            }

            rs.close();
            stmt.close();
        // Set item properties based on database result
        return item;
        
    
        }
        catch (Exception e) {
            throw new ServletException(e);
        }
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String itemIdParam = request.getParameter("itemNo");
        Boolean imgcheck = false;

        // Log the item ID for debugging
        System.out.println("Item ID: " + itemIdParam);

        if (itemIdParam == null || itemIdParam.isEmpty()) {
            throw new ServletException("Item ID is missing or invalid");
        }

        int itemId = Integer.parseInt(itemIdParam);

        String condition = request.getParameter("condition");
        String description = request.getParameter("description");
        byte[] image = null;

        Part filePart = request.getPart("image");
        InputStream imageInputStream = null;
        if (filePart != null) {
            imageInputStream = filePart.getInputStream();
            //System.out.println(imageInputStream.available());
            
            
            if(imageInputStream.available()>0)
            {
            	imgcheck = true;
            	image = imageInputStream.readAllBytes();
            	System.out.println("imgcheck in if statement"+imgcheck);
            }
        }

        // Fetch the current listing status of the item
        String currentListingStatus = getCurrentListingStatus(itemId);
        System.out.println("Image status:"+imgcheck);
        
        if ("Publish".equals(currentListingStatus ) ){
        	if(imgcheck)
        	{
        		System.out.println("There is img, replace");
        		updateItemForPublishedStatus(itemId, condition, description, image);
        	}else if(!imgcheck)
        	{
        		System.out.println("There is no img, keep old");
        		updateItemForPublishedStatus(itemId, condition, description);
        	}            
        } 
        else
        {
            String title = request.getParameter("title");
            String categoryParam = request.getParameter("category");
            String auctionTypeParam = request.getParameter("auctionType");
            String durationPresetParam = request.getParameter("durationPreset");
            String startPriceParam = request.getParameter("startPrice");
            String minSellPriceParam = request.getParameter("minSellPrice");
            String listingStatus = request.getParameter("listingStatus");

            // Log parameters for debugging
            System.out.println("Title: " + title);
            System.out.println("Category: " + categoryParam);
            System.out.println("Auction Type: " + auctionTypeParam);
            System.out.println("Duration Preset: " + durationPresetParam);
            System.out.println("Start Price: " + startPriceParam);
            System.out.println("Min Sell Price: " + minSellPriceParam);
            System.out.println("Listing Status: " + listingStatus);

            if (title == null || categoryParam == null || auctionTypeParam == null || durationPresetParam == null || startPriceParam == null || minSellPriceParam == null || listingStatus == null) {
                throw new ServletException("Missing required parameters");
            }

            int categoryNo = Integer.parseInt(categoryParam);
            int auctionType = Integer.parseInt(auctionTypeParam);
            int durationPreset = Integer.parseInt(durationPresetParam);
            BigDecimal startPrice = new BigDecimal(startPriceParam);
            BigDecimal minSellPrice = new BigDecimal(minSellPriceParam);

            Date startDate = new Date();
            Date endDate = new Date();
            if ("Publish".equals(listingStatus)) {
                int durationInHours = getDurationInHoursFromDB(durationPreset);
                endDate = new Date(startDate.getTime() + (durationInHours * 3600000));
            }
            if(imgcheck)
        	{
        		System.out.println("There is img, replace");
        		updateItem(itemId, title, categoryNo, condition, description, auctionType, durationPreset, startDate, endDate, startPrice, minSellPrice, listingStatus, image);
        	}else if(!imgcheck)
        	{
        		System.out.println("There is no img, keep old");
        		updateItem(itemId, title, categoryNo, condition, description, auctionType, durationPreset, startDate, endDate, startPrice, minSellPrice, listingStatus);
        	}      

            
        }

        response.sendRedirect("ShowMyItemsServlet");
    }

    private String getCurrentListingStatus(int itemId) throws ServletException {
        String listingStatus = null;
        try (Connection conn = getDBConnection()) {
            String sql = "SELECT listingStatus FROM Item WHERE itemNo = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, itemId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        listingStatus = rs.getString("listingStatus");
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
        return listingStatus;
    }

    private void updateItemForPublishedStatus(int itemId, String condition, String description, byte[] image) throws ServletException {
        try (Connection conn = getDBConnection()) {
            String sql = "UPDATE Item SET `condition` = ?, description = ?, image = ? WHERE itemNo = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, condition);
                stmt.setString(2, description);
                if (image != null) {
                    stmt.setBytes(3, image);
                } else {
                    stmt.setNull(3, java.sql.Types.BLOB);
                }
                stmt.setInt(4, itemId);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
    private void updateItemForPublishedStatus(int itemId, String condition, String description) throws ServletException {
        try (Connection conn = getDBConnection()) {
            String sql = "UPDATE Item SET `condition` = ?, description = ? WHERE itemNo = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, condition);
                stmt.setString(2, description);                
                stmt.setInt(3, itemId);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }

    private void updateItem(int itemId, String title, int categoryNo, String condition, String description, int auctionType, int durationPreset, Date startDate, Date endDate, BigDecimal startPrice, BigDecimal minSellPrice, String listingStatus, byte[] image) throws ServletException {
        try (Connection conn = getDBConnection()) {
            String sql = "UPDATE Item SET title = ?, categoryNo = ?, `condition` = ?, description = ?, auctionType = ?, durationPreset = ?, startDate = ?, endDate = ?, startPrice = ?, minSellPrice = ?, listingStatus = ?, image = ? WHERE itemNo = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, title);
                stmt.setInt(2, categoryNo);
                stmt.setString(3, condition);
                stmt.setString(4, description);
                stmt.setInt(5, auctionType);
                stmt.setInt(6, durationPreset);
                stmt.setTimestamp(7, new java.sql.Timestamp(startDate.getTime()));
                stmt.setTimestamp(8, new java.sql.Timestamp(endDate.getTime()));
                stmt.setBigDecimal(9, startPrice);
                stmt.setBigDecimal(10, minSellPrice);
                stmt.setString(11, listingStatus);
                if (image != null) {
                    stmt.setBytes(12, image);
                } else {
                    stmt.setNull(12, java.sql.Types.BLOB);
                }
                stmt.setInt(13, itemId);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
    private void updateItem(int itemId, String title, int categoryNo, String condition, String description, int auctionType, int durationPreset, Date startDate, Date endDate, BigDecimal startPrice, BigDecimal minSellPrice, String listingStatus) throws ServletException {
        try (Connection conn = getDBConnection()) {
            String sql = "UPDATE Item SET title = ?, categoryNo = ?, `condition` = ?, description = ?, auctionType = ?, durationPreset = ?, startDate = ?, endDate = ?, startPrice = ?, minSellPrice = ?, listingStatus = ? WHERE itemNo = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, title);
                stmt.setInt(2, categoryNo);
                stmt.setString(3, condition);
                stmt.setString(4, description);
                stmt.setInt(5, auctionType);
                stmt.setInt(6, durationPreset);
                stmt.setTimestamp(7, new java.sql.Timestamp(startDate.getTime()));
                stmt.setTimestamp(8, new java.sql.Timestamp(endDate.getTime()));
                stmt.setBigDecimal(9, startPrice);
                stmt.setBigDecimal(10, minSellPrice);
                stmt.setString(11, listingStatus);
               
                stmt.setInt(12, itemId);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?sessionVariables=sql_mode='NO_ENGINE_SUBSTITUTION'&jdbcCompliantTruncation=false&serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }

    private int getDurationInHoursFromDB(int durationPresetId) throws ServletException {
        int durationInHours = 0;
        try (Connection conn = getDBConnection()) {
            String sql = "SELECT hours FROM DurationPreset WHERE durationId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, durationPresetId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        durationInHours = rs.getInt("hours");
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
        return durationInHours;
    }
}