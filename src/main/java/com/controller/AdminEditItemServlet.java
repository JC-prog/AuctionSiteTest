package com.controller;

import com.model.AuctionType;
import com.model.Condition;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;
import com.util.DBConnectionUtil;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@MultipartConfig
@WebServlet("/AdminEditItemServlet")
public class AdminEditItemServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        Item item = new Item();
		try {
			item = getItemById(itemNo);
		} catch (ClassNotFoundException | ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        request.setAttribute("item", item);
        request.getRequestDispatcher("/pages/adminEditItem.jsp").forward(request, response);
    }

    private Item getItemById(int itemNo) throws ServletException, ClassNotFoundException {
        Item item = new Item();
        try (Connection conn = DBConnectionUtil.getDBConnection()) {
            String sql = "SELECT " +
                    "i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                    "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, " +
                    "i.description, a.auctionTypeID, a.name AS auctionTypeName, " +
                    "d.durationID, d.name AS durationPresetName, d.hours, " +
                    "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                    "FROM Item i " +
                    "JOIN User u ON i.sellerID = u.uID " +
                    "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                    "JOIN ItemCondition con ON i.condition = con.conditionID " +
                    "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                    "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                    "WHERE i.itemNo = ?";

            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, itemNo);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        item = new Item();
                        item.setItemNo(rs.getInt("itemNo"));

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

                        Condition condition = new Condition(rs.getInt("conditionID"), rs.getString("conditionName"), true);
                        item.setCondition(condition);
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

                        byte[] image = rs.getBytes("image");
                        if (image != null) {
                            item.setImage(image);
                        }
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
        return item;
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Retrieve and parse form data
    	/*
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        String title = request.getParameter("title");
        String sellerID = request.getParameter("sellerID");
        int categoryNo = Integer.parseInt(request.getParameter("categoryNo"));
        String condition = request.getParameter("condition");
        String description = request.getParameter("description");
        int auctionTypeID = Integer.parseInt(request.getParameter("auctionTypeID"));
        int durationID = Integer.parseInt(request.getParameter("durationID"));
        String startDateStr = request.getParameter("startDate");
        String endDateStr = request.getParameter("endDate");
        BigDecimal startPrice = new BigDecimal(request.getParameter("startPrice"));
        BigDecimal minSellPrice = new BigDecimal(request.getParameter("minSellPrice"));
        String listingStatus = request.getParameter("listingStatus");
        boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

        // Convert dates
        Timestamp startDate = Timestamp.valueOf(startDateStr);
        Timestamp endDate = Timestamp.valueOf(endDateStr);

        // Update item in the database
        try {
            updateItem(itemNo, title, sellerID, categoryNo, condition, description, auctionTypeID, durationID, startDate, endDate, startPrice, minSellPrice, listingStatus, isActive);
            response.sendRedirect(request.getContextPath() + "/AdminItemListServlet");
        } catch (Exception e) {
            throw new ServletException(e);
        }
        */
    	boolean imgcheck = false;
    	try {
            // Retrieve and parse form data
            int itemNo = Integer.parseInt(getParameterOrThrow(request, "itemNo"));
            String title = request.getParameter("title");
            String sellerID = request.getParameter("sellerID");
            int categoryNo = Integer.parseInt(getParameterOrThrow(request, "category"));
            String condition = request.getParameter("condition");
            String description = request.getParameter("description");
            int auctionTypeID = Integer.parseInt(getParameterOrThrow(request, "auctionType"));
            int durationID = Integer.parseInt(getParameterOrThrow(request, "durationPreset"));
            String startDateStr = getParameterOrThrow(request, "startDate").replace('T', ' ') + ":00";
            String endDateStr = getParameterOrThrow(request, "endDate").replace('T', ' ') + ":00";
            BigDecimal startPrice = new BigDecimal(getParameterOrThrow(request, "startPrice"));
            BigDecimal minSellPrice = new BigDecimal(getParameterOrThrow(request, "minSellPrice"));
            String listingStatus = request.getParameter("listingStatus");
            boolean isActive = Boolean.parseBoolean(request.getParameter("isActive"));

            // Convert dates
            Timestamp startDate = Timestamp.valueOf(startDateStr);
            Timestamp endDate = Timestamp.valueOf(endDateStr);
            
            byte[] image = null;

            Part filePart = request.getPart("image");
            if (filePart != null) {
                try (InputStream imageInputStream = filePart.getInputStream()) {
                    if (imageInputStream.available() > 0) {
                        imgcheck = true;
                        image = imageInputStream.readAllBytes();
                    }
                }
            }

            // Update item in the database
            if (imgcheck) {
            	updateItem(itemNo, title, sellerID, categoryNo, condition, description, auctionTypeID, durationID, startDate, endDate, startPrice, minSellPrice, listingStatus, isActive,image);
                //updateItemForPublishedStatus(itemId, condition, description, image);
            } else {
            	updateItem(itemNo, title, sellerID, categoryNo, condition, description, auctionTypeID, durationID, startDate, endDate, startPrice, minSellPrice, listingStatus, isActive);
                //updateItemForPublishedStatus(itemId, condition, description);
            }
            
            
            
            response.sendRedirect("AdminHomeServlet");
            //response.sendRedirect(request.getContextPath() + "/AdminItemListServlet");
        } catch (NumberFormatException | NullPointerException e) {
            throw new ServletException("Invalid input data", e);
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
    private String getParameterOrThrow(HttpServletRequest request, String paramName) {
        String paramValue = request.getParameter(paramName);
        if (paramValue == null || paramValue.isEmpty()) {
            throw new NullPointerException("Parameter " + paramName + " is missing or empty");
        }
        return paramValue;
    }

    private void updateItem(int itemNo, String title, String sellerID, int categoryNo, String condition, String description, int auctionTypeID, int durationID, Timestamp startDate, Timestamp endDate, BigDecimal startPrice, BigDecimal minSellPrice, String listingStatus, boolean isActive) throws SQLException, ClassNotFoundException {
        /*
    	String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
		*/
        String sql = "UPDATE Item SET title=?, sellerID=?, categoryNo=?, `condition`=?, description=?, auctionType=?, durationPreset=?, startDate=?, endDate=?, startPrice=?, minSellPrice=?, listingStatus=?, isActive=? WHERE itemNo=?";

        
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, title);
            stmt.setString(2, sellerID);
            stmt.setInt(3, categoryNo);
            stmt.setString(4, condition);
            stmt.setString(5, description);
            stmt.setInt(6, auctionTypeID);
            stmt.setInt(7, durationID);
            stmt.setTimestamp(8, startDate);
            stmt.setTimestamp(9, endDate);
            stmt.setBigDecimal(10, startPrice);
            stmt.setBigDecimal(11, minSellPrice);
            stmt.setString(12, listingStatus);
            stmt.setBoolean(13, isActive);
            stmt.setInt(14, itemNo);
            stmt.executeUpdate();
        }
    }
    //overload for image
    private void updateItem(int itemNo, String title, String sellerID, int categoryNo, String condition, String description, int auctionTypeID, int durationID, Timestamp startDate, Timestamp endDate, BigDecimal startPrice, BigDecimal minSellPrice, String listingStatus, boolean isActive,byte[] image) throws SQLException, ClassNotFoundException {
        /*
    	String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
		*/
        String sql = "UPDATE Item SET title=?, sellerID=?, categoryNo=?, `condition`=?, description=?, auctionType=?, durationPreset=?, startDate=?, endDate=?, startPrice=?, minSellPrice=?, listingStatus=?, isActive=?,Image=? WHERE itemNo=?";

        
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, title);
            stmt.setString(2, sellerID);
            stmt.setInt(3, categoryNo);
            stmt.setString(4, condition);
            stmt.setString(5, description);
            stmt.setInt(6, auctionTypeID);
            stmt.setInt(7, durationID);
            stmt.setTimestamp(8, startDate);
            stmt.setTimestamp(9, endDate);
            stmt.setBigDecimal(10, startPrice);
            stmt.setBigDecimal(11, minSellPrice);
            stmt.setString(12, listingStatus);
            stmt.setBoolean(13, isActive);
            stmt.setBytes(14, image);
            stmt.setInt(15, itemNo );
            stmt.executeUpdate();
        }
    }


    // Implement the doPost method similarly if required
}
