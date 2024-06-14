package com.service;

import java.math.BigDecimal;
import java.sql.*;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.model.Transaction;

public class MyTask extends TimerTask {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";
    private static final Logger LOGGER = Logger.getLogger(MyTask.class.getName());
    private int itemNo = 0;

    public MyTask(int itemNo) {
        this.itemNo = itemNo;
    }

    @Override
    public void run() {
        LOGGER.info("Checking for items to close...");
        closeExpiredItems();
    }

    private void closeExpiredItems() {
        Connection conn = null;
        PreparedStatement updateStmt = null;
        PreparedStatement bidCheckStmt = null;
        PreparedStatement transactionStmt = null;

        try {
            // Establish connection
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

            // Update the listing status of items that have passed their end date
            String updateSql = "UPDATE Item SET listingStatus = 'Closed' WHERE ItemNo = ? AND listingStatus = 'Publish'";
            updateStmt = conn.prepareStatement(updateSql);
            updateStmt.setInt(1, itemNo);

            // Execute update
            int rowsAffected = updateStmt.executeUpdate();
            LOGGER.info("Items closed: " + rowsAffected);

            if (rowsAffected > 0) {
                // Check for bids on the closed item
                String bidCheckSql = "SELECT bidderID, bidAmount FROM Bid WHERE itemNo = ? ORDER BY bidAmount DESC LIMIT 1";
                bidCheckStmt = conn.prepareStatement(bidCheckSql);
                bidCheckStmt.setInt(1, itemNo);

                ResultSet rs = bidCheckStmt.executeQuery();
                if (rs.next()) {
                	System.out.println("This is the highest bidder");
                	System.out.println("This is the highest bidder");
                    String highestBidder = rs.getString("bidderID");
                    BigDecimal highestBidAmount = rs.getBigDecimal("bidAmount");

                    // Create a transaction record for highest bid
                    Transaction transaction = new Transaction();
                    transaction.setBuyerID(highestBidder);
                    transaction.setSellerID(getSellerID(conn, itemNo));
                    transaction.setItemNo(itemNo);
                    transaction.setSaleAmount(highestBidAmount);
                    transaction.setStatus("Completed");
                    transaction.setTimestamp(new Timestamp(System.currentTimeMillis()));
                    transaction.setActive(true);

                    insertTransaction(conn, transaction);
                } else {
                	System.out.println("No one bid on item");
                    // Create a transaction record with status 'Unsold'
                    Transaction transaction = new Transaction();
                    transaction.setBuyerID(null);
                    transaction.setSellerID(getSellerID(conn, itemNo));
                    transaction.setItemNo(itemNo);
                    transaction.setSaleAmount(BigDecimal.ZERO);
                    transaction.setStatus("Unsold");
                    transaction.setTimestamp(new Timestamp(System.currentTimeMillis()));
                    transaction.setActive(true);

                    insertTransaction(conn, transaction);
                }
            }

        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error processing expired items", e);
        } finally {
            // Close resources
            closeResources(updateStmt, bidCheckStmt, transactionStmt, conn);
        }
    }

    private String getSellerID(Connection conn, int itemNo) throws SQLException {
        String sellerID = null;
        String sql = "SELECT sellerID FROM Item WHERE itemNo = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, itemNo);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                sellerID = rs.getString("sellerID");
            }
        }
        return sellerID;
    }

    private void insertTransaction(Connection conn, Transaction transaction) throws SQLException {
        String sql = "INSERT INTO Transaction (BuyerID, SellerID, ItemNo, SaleAmount, Status, Timestamp, isActive) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, transaction.getBuyerID());
            stmt.setString(2, transaction.getSellerID());
            stmt.setInt(3, transaction.getItemNo());
            stmt.setBigDecimal(4, transaction.getSaleAmount());
            stmt.setString(5, transaction.getStatus());
            stmt.setTimestamp(6, transaction.getTimestamp());
            stmt.setBoolean(7, transaction.isActive());
            stmt.executeUpdate();
        }
    }

    private void closeResources(AutoCloseable... resources) {
        for (AutoCloseable resource : resources) {
            if (resource != null) {
                try {
                    resource.close();
                } catch (Exception e) {
                    LOGGER.log(Level.SEVERE, "Error closing resource", e);
                }
            }
        }
    }
}
