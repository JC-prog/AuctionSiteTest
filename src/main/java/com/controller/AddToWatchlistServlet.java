package com.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@WebServlet("/AddToWatchlistServlet")
public class AddToWatchlistServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String buyerID = (String) session.getAttribute("uID"); // Assuming buyerID is stored in session
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));

        try (Connection conn = getDBConnection()) {
            // Check for duplicates
            String checkSql = "SELECT COUNT(*) FROM Watchlist WHERE BuyerID = ? AND ItemNo = ? AND isActive = TRUE";
            try (PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
                checkStmt.setString(1, buyerID);
                checkStmt.setInt(2, itemNo);
                
                try (ResultSet rs = checkStmt.executeQuery()) {
                    if (rs.next() && rs.getInt(1) > 0) {
                        request.setAttribute("watchlistMessage", "Item is already in your watchlist.");
                        request.getRequestDispatcher("ViewItemServlet?itemNo=" + itemNo).forward(request, response);
                        return;
                    }
                }
            }

            // Add to watchlist
            String insertSql = "INSERT INTO Watchlist (BuyerID, ItemNo, Timestamp, isActive) VALUES (?, ?, ?, ?)";
            try (PreparedStatement insertStmt = conn.prepareStatement(insertSql)) {
                insertStmt.setString(1, buyerID);
                insertStmt.setInt(2, itemNo);
                insertStmt.setTimestamp(3, new java.sql.Timestamp(new Date().getTime()));
                insertStmt.setBoolean(4, true);

                insertStmt.executeUpdate();
            }

            request.setAttribute("watchlistMessage", "Item added to your watchlist successfully.");
            request.getRequestDispatcher("ViewItemServlet?itemNo=" + itemNo).forward(request, response);

        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }
}



