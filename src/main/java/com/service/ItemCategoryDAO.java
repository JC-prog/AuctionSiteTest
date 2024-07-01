package com.service;

import com.model.ItemCategory;
import com.util.DBConnectionUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemCategoryDAO {

    // Method to get all item categories from the database
    public List<ItemCategory> getAllCategories() throws ClassNotFoundException {
        List<ItemCategory> categories = new ArrayList<>();
        String query = "SELECT categoryNo, catName, isActive FROM ItemCategory";

        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                int categoryNo = rs.getInt("categoryNo");
                String catName = rs.getString("catName");
                boolean isActive = rs.getBoolean("isActive");

                ItemCategory category = new ItemCategory(categoryNo, catName, isActive);
                categories.add(category);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return categories;
    }

    // Method to add a new item category to the database
    public boolean addCategory(ItemCategory category) throws ClassNotFoundException {
        String query = "INSERT INTO ItemCategory (catName, isActive) VALUES (?, ?)";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, category.getCatName());
            stmt.setBoolean(2, category.isActive());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to update an existing item category in the database
    public boolean updateCategory(ItemCategory category) throws ClassNotFoundException {
        String query = "UPDATE ItemCategory SET catName = ?, isActive = ? WHERE categoryNo = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, category.getCatName());
            stmt.setBoolean(2, category.isActive());
            stmt.setInt(3, category.getCategoryNo());
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Method to delete an item category from the database
    public boolean deleteCategory(int categoryNo) throws ClassNotFoundException {
        String query = "DELETE FROM ItemCategory WHERE categoryNo = ?";
        try (Connection conn = DBConnectionUtil.getDBConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, categoryNo);
            int rowsAffected = stmt.executeUpdate();

            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
