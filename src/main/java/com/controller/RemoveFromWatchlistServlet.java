package com.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/RemoveFromWatchlistServlet")
public class RemoveFromWatchlistServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int watchlistID = Integer.parseInt(request.getParameter("watchlistID"));

        try (Connection conn = getDBConnection()) {
            String sql = "UPDATE Watchlist SET isActive = FALSE WHERE WatchlistID = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, watchlistID);
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        // Redirect back to the watchlist page
        response.sendRedirect("GetWatchlistServlet");
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }
}
