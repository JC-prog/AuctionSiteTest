package com.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MyTask extends TimerTask {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";
    private static final Logger LOGGER = Logger.getLogger(MyTask.class.getName());
    int itemNo = 0;

    public MyTask(int itemNo) {
        // Initialization if needed
    	this.itemNo =  itemNo;   }

    @Override
    public void run() {
        LOGGER.info("Checking for items to close...");
        closeExpiredItems();
    }

    private void closeExpiredItems() {
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            // Establish connection
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

            // Update the listing status of items that have passed their end date
            //String sql = "UPDATE Item SET listingStatus = 'Closed' WHERE ItemNo = ? AND endDate < ? AND listingStatus = 'Publish'";
            
            String sql = "UPDATE Item SET listingStatus = 'Closed' WHERE ItemNo = ? AND listingStatus = 'Publish'";
            stmt = conn.prepareStatement(sql);

            // Set current timestamp
            stmt.setInt(1,itemNo);
            //stmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));

            // Execute update
            int rowsAffected = stmt.executeUpdate();
            LOGGER.info("Items closed: " + rowsAffected);

        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating listing status", e);
        } finally {
            // Close resources
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    LOGGER.log(Level.SEVERE, "Error closing statement", e);
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    LOGGER.log(Level.SEVERE, "Error closing connection", e);
                }
            }
        }
    }
}
