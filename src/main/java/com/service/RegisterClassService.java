package com.service;

import com.model.RegisterClass;

import java.sql.*;

public class RegisterClassService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    public RegisterClass getUserById(String userId) {
        RegisterClass user = null;
        String sql = "SELECT * FROM User WHERE uID = ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, userId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new RegisterClass();
                user.setuId(rs.getString("uID"));
                user.setuName(rs.getString("uName"));
                user.setuMail(rs.getString("uMail"));
                user.setuPass(rs.getString("uPass"));
                user.setuAddress(rs.getString("uAddress"));
                user.setuNum(rs.getString("uNum"));
                user.setisAdmin(rs.getBoolean("isAdmin"));
                user.setisActive(rs.getBoolean("isActive"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }

    public boolean updateUser(RegisterClass user) {
        String sql = "UPDATE User SET uName = ?, uMail = ?, uPass = ?, uAddress = ? WHERE uID = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getuName());
            stmt.setString(2, user.getuMail());
            stmt.setString(3, user.getuPass());
            stmt.setString(4, user.getuAddress());
            stmt.setString(5, user.getuId());
            int rowsUpdated = stmt.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deactivateUser(String userId) {
        String sql = "UPDATE User SET isActive = false WHERE uID = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, userId);
            int rowsUpdated = stmt.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
