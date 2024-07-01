package com.service;

import com.model.DurationPreset;
import com.util.DBConnectionUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DurationPresetDAO {

    // Method to get all duration presets from the database
    public List<DurationPreset> getAllDurations() throws ClassNotFoundException {
        List<DurationPreset> durations = new ArrayList<>();
        String query = "SELECT durationID, name, hours, isActive FROM DurationPreset";

        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int durationID = rs.getInt("durationID");
                String name = rs.getString("name");
                int hours = rs.getInt("hours");
                boolean isActive = rs.getBoolean("isActive");

                DurationPreset duration = new DurationPreset(durationID, name, hours, isActive);
                durations.add(duration);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return durations;
    }

    // Method to add a new duration preset to the database
    public boolean addDuration(DurationPreset duration) throws ClassNotFoundException {
        String query = "INSERT INTO DurationPreset (name, hours, isActive) VALUES (?, ?, ?)";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, duration.getName());
            stmt.setInt(2, duration.getHours());
            stmt.setBoolean(3, duration.isActive());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to update an existing duration preset in the database
    public boolean updateDuration(DurationPreset duration) throws ClassNotFoundException {
        String query = "UPDATE DurationPreset SET name = ?, hours = ?, isActive = ? WHERE durationID = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, duration.getName());
            stmt.setInt(2, duration.getHours());
            stmt.setBoolean(3, duration.isActive());
            stmt.setInt(4, duration.getDurationID());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to delete a duration preset from the database
    public boolean deleteDuration(int durationID) throws ClassNotFoundException {
        String query = "DELETE FROM DurationPreset WHERE durationID = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, durationID);
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
