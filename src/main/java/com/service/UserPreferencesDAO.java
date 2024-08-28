package com.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import com.util.DBConnectionUtil;

public class UserPreferencesDAO {

    public void logUserPreference(String currentUserID, int categoryId, double preferenceScore) throws ClassNotFoundException {
        String sql = "INSERT INTO user_preferences (user_id, category_id, preference_score) " +
                     "VALUES (?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE preference_score = preference_score + ?";

        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, currentUserID);
            stmt.setInt(2, categoryId);
            stmt.setDouble(3, preferenceScore);
            stmt.setDouble(4, preferenceScore);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
