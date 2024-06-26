package com.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.util.DBConnectionUtil;

@WebServlet("/SuspendServlet")
public class SuspendServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uId = request.getParameter("uId");

        try (Connection conn = DBConnectionUtil.getDBConnection()) {
            String sql = "UPDATE user SET isActive = NOT isActive WHERE uId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, uId);
                stmt.executeUpdate();
            }
        } catch (Exception e) {
            throw new ServletException(e);
        }

        response.sendRedirect("ViewUsersServlet");
    }
}
