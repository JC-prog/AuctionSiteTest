package com.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.model.LoginClass;
import com.util.DBConnectionUtil;

public class LoginValidate {

    public User validate(LoginClass loginClass) throws ClassNotFoundException {
        String sql = "SELECT uID, isAdmin FROM user WHERE uName = ? AND uPass = ? AND isActive = TRUE";
        
        try (Connection connection = DBConnectionUtil.getDBConnection();
             PreparedStatement preStmt = connection.prepareStatement(sql)) {
            preStmt.setString(1, loginClass.getuName());
            preStmt.setString(2, loginClass.getuPass());

            System.out.println(preStmt);

            ResultSet resultSet = preStmt.executeQuery();

            if (resultSet.next()) {
                String userId = resultSet.getString("uID");
                boolean isAdmin = resultSet.getBoolean("isAdmin");
                return new User(userId, isAdmin);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            printSQLException(e);
        }
        return null;
    }

    private void printSQLException(SQLException ex) {
        for (Throwable e : ex) {
            if (e instanceof SQLException) {
                e.printStackTrace(System.err);
                System.err.println("SQLState: " + ((SQLException) e).getSQLState());
                System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
                System.err.println("Message: " + e.getMessage());
                Throwable t = ex.getCause();
                
                while (t != null) {
                    System.out.println("Cause: " + t);
                    t = t.getCause();
                }
            }
        }
    }
}
