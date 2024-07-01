package com.service;

import com.model.Condition;
import com.util.DBConnectionUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ConditionDAO {

    // Method to get all conditions from the database
    public List<Condition> getAllConditions() throws ClassNotFoundException {
        List<Condition> conditions = new ArrayList<>();
        String query = "SELECT conditionID, name, isActive FROM itemcondition";

        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int conditionID = rs.getInt("conditionID");
                String name = rs.getString("name");
                boolean isActive = rs.getBoolean("isActive");

                Condition condition = new Condition(conditionID, name, isActive);
                conditions.add(condition);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conditions;
    }

    // Method to add a new condition to the database
    public boolean addCondition(Condition condition) throws ClassNotFoundException {
        String query = "INSERT INTO itemcondition (name, isActive) VALUES (?, ?)";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, condition.getName());
            stmt.setBoolean(2, condition.isIsActive());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to update an existing condition in the database
    public boolean updateCondition(Condition condition) throws ClassNotFoundException {
        String query = "UPDATE itemcondition SET name = ?, isActive = ? WHERE conditionID = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, condition.getName());
            stmt.setBoolean(2, condition.isIsActive());
            stmt.setInt(3, condition.getConditionID());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to delete a condition from the database
    public boolean deleteCondition(int conditionID) throws ClassNotFoundException {
        String query = "DELETE FROM itemcondition WHERE conditionID = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, conditionID);
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
