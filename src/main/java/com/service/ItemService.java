package com.service;

import com.model.Item;
import com.model.RegisterClass;
import com.model.ItemCategory;
import com.model.AuctionType;
import com.model.Condition;
import com.model.DurationPreset;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.util.DBConnectionUtil;

import javax.servlet.ServletException;

public class ItemService {

    // Method to retrieve item details by itemNo
	 public static Item getItemDetails(int itemNo) throws ServletException {
	        Item item = null;
	        Connection conn = null;
	        PreparedStatement stmt = null;
	        ResultSet rs = null;

	        try {
	            // Database connection details
	            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
	            String user = "root";
	            String password = "password";
	            conn = DriverManager.getConnection(url, user, password);

	            // SQL query to fetch item details
	            String sql = "SELECT " +
	                "i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
	                "con.conditionID, con.name AS conditionName, " +
	                "c.categoryNo, c.catName AS categoryName, i.description, " +
	                "a.auctionTypeID, a.name AS auctionTypeName, " +
	                "d.durationID, d.name AS durationPresetName, d.hours, " +
	                "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
	                "FROM Item i " +
	                "JOIN User u ON i.sellerID = u.uID " +
	                "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
	                "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
	                "JOIN ItemCondition con ON i.`condition` = con.conditionID " +
	                "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
	                "WHERE i.itemNo = ?";

	            stmt = conn.prepareStatement(sql);
	            stmt.setInt(1, itemNo);
	            rs = stmt.executeQuery();

	            // If item details found, populate the Item object
	            if (rs.next()) {
	                item = new Item();
	                item.setItemNo(rs.getInt("itemNo"));

	                RegisterClass seller = new RegisterClass();
	                seller.setuId(rs.getString("sellerID"));
	                seller.setuName(rs.getString("sellerName"));
	                seller.setuMail(rs.getString("sellerEmail"));
	                item.setSeller(seller);

	                item.setTitle(rs.getString("title"));

	                ItemCategory category = new ItemCategory(rs.getInt("categoryNo"), rs.getString("categoryName"), true);
	                item.setCategory(category);

	                Condition condition = new Condition(rs.getInt("conditionID"), rs.getString("conditionName"), true);
	                item.setCondition(condition);
	                item.setDescription(rs.getString("description"));

	                AuctionType auctionType = new AuctionType();
	                auctionType.setAuctionTypeID(rs.getInt("auctionTypeID"));
	                auctionType.setName(rs.getString("auctionTypeName"));
	                item.setAuctionType(auctionType);

	                DurationPreset durationPreset = new DurationPreset(rs.getInt("durationID"), rs.getString("durationPresetName"), rs.getInt("hours"), true);
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
	            } else {
	            	System.out.print("No item found with itemNo: "+itemNo);
	            }

	        } catch (SQLException e) {
	        	
	            System.out.print("Database access error "+ e);
	            throw new ServletException("Database access error", e);
	        } finally {
	            // Close resources
	            close(rs);
	            close(stmt);
	            close(conn);
	        }

	        return item;
	    }

	    private static void close(AutoCloseable ac) {
	        if (ac != null) {
	            try {
	                ac.close();
	            } catch (Exception e) {
	                System.out.print("Error closing resource "+ e);
	            }
	        }
	    }
    
    public List<Item> getRecommendedItems(String userId) {
        List<Item> recommendedItems = new ArrayList<>();
        String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                     "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, i.description, " +
                     "a.auctionTypeID, a.name AS auctionTypeName, " +
                     "d.durationID, d.name AS durationPresetName, d.hours, " +
                     "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                     "FROM item i " +
                     "JOIN user_preferences up ON i.categoryNo = up.category_id " +
                     "JOIN User u ON i.sellerID = u.uID " +
                     "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                     "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                     "JOIN ItemCondition con ON i.condition = con.conditionID " +
                     "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                     "WHERE up.user_id = ? " +
                     "ORDER BY up.preference_score DESC " +
                     "LIMIT 10";

        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Item item = new Item();
                    item.setItemNo(rs.getInt("itemNo"));
                    item.setTitle(rs.getString("title"));

                    RegisterClass seller = new RegisterClass();
                    seller.setuId(rs.getString("sellerID"));
                    seller.setuName(rs.getString("sellerName"));
                    seller.setuMail(rs.getString("sellerEmail"));
                    item.setSeller(seller);

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

                    // Retrieve image blob
                    byte[] imageBytes = rs.getBytes("image");
                    if (imageBytes != null) {
                        item.setImage(imageBytes);
                    }

                    recommendedItems.add(item);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return recommendedItems;
    }
}
