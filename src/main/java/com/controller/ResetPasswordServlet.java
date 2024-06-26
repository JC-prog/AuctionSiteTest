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
import com.util.EmailUtil;

@WebServlet("/ResetPasswordServlet")
public class ResetPasswordServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uId = request.getParameter("uId");
        String uMail = request.getParameter("uMail");
        String newPassword = "password";

        try (Connection conn = DBConnectionUtil.getDBConnection()) {
            String sql = "UPDATE user SET uPass = ? WHERE uId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, newPassword);
                stmt.setString(2, uId);
                stmt.executeUpdate();
            }

            // Send email with new password
            String subject = "Password Reset";
            String message = "Your password has been reset to: " + newPassword;
            EmailUtil.sendEmail(uMail, subject, message);

        } catch (Exception e) {
            throw new ServletException(e);
        }

        response.sendRedirect("ViewUsersServlet");
    }
}
