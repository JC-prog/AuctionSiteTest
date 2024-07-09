package com.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.Feedback;

public class FeedbackService {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";

    public void addFeedback(String senderID, String senderEmail, String subject, String message) {
        String sql = "INSERT INTO feedback (SenderID, SenderEmail, Subject, Message, Timestamp, isActive) VALUES (?, ?, ?, ?, NOW(), 1)";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, senderID);
            stmt.setString(2, senderEmail);
            stmt.setString(3, subject);
            stmt.setString(4, message);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbackList = new ArrayList<>();
        String sql = "SELECT * FROM feedback WHERE isActive = 1";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Feedback feedback = new Feedback();
                feedback.setFeedbackID(rs.getInt("FeedbackID"));
                feedback.setSenderID(rs.getString("SenderID"));
                feedback.setSenderEmail(rs.getString("SenderEmail"));
                feedback.setSubject(rs.getString("Subject"));
                feedback.setMessage(rs.getString("Message"));
                feedback.setTimestamp(rs.getTimestamp("Timestamp"));
                feedback.setActive(rs.getBoolean("isActive"));
                feedbackList.add(feedback);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return feedbackList;
    }

    public Feedback getFeedbackById(int feedbackID) {
        Feedback feedback = null;
        String sql = "SELECT * FROM feedback WHERE FeedbackID = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, feedbackID);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                feedback = new Feedback();
                feedback.setFeedbackID(rs.getInt("FeedbackID"));
                feedback.setSenderID(rs.getString("SenderID"));
                feedback.setSenderEmail(rs.getString("SenderEmail"));
                feedback.setSubject(rs.getString("Subject"));
                feedback.setMessage(rs.getString("Message"));
                feedback.setTimestamp(rs.getTimestamp("Timestamp"));
                feedback.setActive(rs.getBoolean("isActive"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return feedback;
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }
}
