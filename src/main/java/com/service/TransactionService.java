package com.service;

import com.model.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TransactionService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";
    public static final TransactionService transvc = new TransactionService();

    public boolean updateTransactionStatus(String transactionID, String status) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        boolean isUpdated = false;

        try {
            connection = getConnection();
            String query = "UPDATE Transaction SET status = ? WHERE transactionID = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, status);
            preparedStatement.setString(2, transactionID);

            int rowsUpdated = preparedStatement.executeUpdate();
            isUpdated = rowsUpdated > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (preparedStatement != null) preparedStatement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return isUpdated;
    }

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    public List<BuyerTransaction> getTransactionsAsBuyer(String myId) {
        List<BuyerTransaction> transactions = new ArrayList<>();
        String sql = "SELECT t.TransactionID, t.buyerID, t.sellerID, t.ItemNo, t.SaleAmount, t.Status, t.Timestamp, t.isActive, " +
                     "u.uName AS sellerName, u.uAddress AS sellerAddress, u.uMail AS sellerEmail, u.uNum AS sellerPhone " +
                     "FROM Transaction t " +
                     "JOIN User u ON t.sellerID = u.uID WHERE t.buyerID = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, myId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                BuyerTransaction transaction = new BuyerTransaction();
                transaction.setTransactionID(rs.getInt("TransactionID"));
                transaction.setBuyerID(rs.getString("buyerID"));
                transaction.setSellerID(rs.getString("sellerID"));
                transaction.setItemNo(rs.getInt("ItemNo"));
                transaction.setSaleAmount(rs.getBigDecimal("SaleAmount"));
                transaction.setStatus(rs.getString("Status"));
                transaction.setTimestamp(rs.getTimestamp("Timestamp"));
                transaction.setActive(rs.getBoolean("isActive"));
                transaction.setBuyerName(rs.getString("sellerName"));
                transaction.setBuyerAddress(rs.getString("sellerAddress"));
                transaction.setBuyerEmail(rs.getString("sellerEmail"));
                transaction.setBuyerPhone(rs.getString("sellerPhone"));
                transactions.add(transaction);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return transactions;
    }

    public List<SellerTransaction> getTransactionsAsSeller(String sellerID) {
        List<SellerTransaction> transactions = new ArrayList<>();
        String sql = "SELECT t.TransactionID, t.buyerID, t.sellerID, t.ItemNo, t.SaleAmount, t.Status, t.Timestamp, t.isActive, " +
                     "u.uName AS buyerName, u.uAddress AS buyerAddress, u.uMail AS buyerEmail, u.uNum AS buyerPhone " +
                     "FROM Transaction t " +
                     "JOIN User u ON t.buyerID = u.uID WHERE t.sellerID = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, sellerID);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                SellerTransaction transaction = new SellerTransaction();
                transaction.setTransactionID(rs.getInt("TransactionID"));
                transaction.setBuyerID(rs.getString("buyerID"));
                transaction.setSellerID(rs.getString("sellerID"));
                transaction.setItemNo(rs.getInt("ItemNo"));
                transaction.setSaleAmount(rs.getBigDecimal("SaleAmount"));
                transaction.setStatus(rs.getString("Status"));
                transaction.setTimestamp(rs.getTimestamp("Timestamp"));
                transaction.setActive(rs.getBoolean("isActive"));
                transaction.setSellerName(rs.getString("buyerName"));
                transaction.setSellerAddress(rs.getString("buyerAddress"));
                transaction.setSellerEmail(rs.getString("buyerEmail"));
                transaction.setSellerPhone(rs.getString("buyerPhone"));
                transactions.add(transaction);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return transactions;
    }

    public List<Item> getAllItemBiddedOn(String sellerID) {
        List<Item> items = new ArrayList<>();
        String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                     "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description,con.conditionID, con.name AS conditionName, " +
                     "a.auctionTypeID, a.name AS auctionTypeName, " +
                     "d.durationID, d.name AS durationPresetName, d.hours, " +
                     "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                     "FROM Item i " +
                     "JOIN User u ON i.sellerID = u.uID " +
                     "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                     "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                     "JOIN ItemCondition con ON i.condition = con.conditionID " +
                     "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                     "WHERE i.sellerID = ? AND i.isActive = TRUE AND i.listingStatus = 'Closed'";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, sellerID);
            ResultSet rs = stmt.executeQuery();
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
                
                Blob imageBlob = rs.getBlob("image");
                if (imageBlob != null) {
                    byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
                    item.setImage(imageBytes);
                }

                items.add(item);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return items;
    }
	    public String getBuyerAddress(String buyerID) {
	        String address = null;
	        String sql = "SELECT uAddress FROM User WHERE uID = ?";
	
	        try (Connection conn = getConnection();
	             PreparedStatement stmt = conn.prepareStatement(sql)) {
	            stmt.setString(1, buyerID);
	            ResultSet rs = stmt.executeQuery();
	            if (rs.next()) {
	                address = rs.getString("uAddress");
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	
	        return address;
	    }
}
