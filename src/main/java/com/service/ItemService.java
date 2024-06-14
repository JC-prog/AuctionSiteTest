package com.service;

import com.model.Item;
import com.model.RegisterClass;
import com.model.ItemCategory;
import com.model.AuctionType;
import com.model.DurationPreset;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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

        } catch (SQLException e) {
            throw new ServletException("Database access error", e);
        } finally {
            // Close resources
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return item;
    }
}
