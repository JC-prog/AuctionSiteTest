package com.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.model.RegisterClass;
import com.util.DBConnectionUtil;

@WebServlet("/EditUserServlet")
public class EditUserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uId = request.getParameter("uId");
        RegisterClass user = null;

        try (Connection conn = DBConnectionUtil.getDBConnection()) {
            String sql = "SELECT * FROM user WHERE uId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, uId);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    user = new RegisterClass();
                    user.setuId(rs.getString("uId"));
                    user.setuName(rs.getString("uName"));
                    user.setuMail(rs.getString("uMail"));
                    user.setuNum(rs.getString("uNum"));
                    user.setuAddress(rs.getString("uAddress"));
                    user.setisActive(rs.getBoolean("isActive"));
                }
            }
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("user", user);
        request.getRequestDispatcher("pages/viewuserdetails.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uId = request.getParameter("uId");
        String uName = request.getParameter("uName");
        String uMail = request.getParameter("uMail");
        String uNum = request.getParameter("uNum");
        String uAddress = request.getParameter("uAddress");

        try (Connection conn = DBConnectionUtil.getDBConnection()) {
            String sql = "UPDATE user SET uName = ?, uMail = ?, uNum = ?, uAddress = ? WHERE uId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, uName);
                stmt.setString(2, uMail);
                stmt.setString(3, uNum);
                stmt.setString(4, uAddress);
                stmt.setString(5, uId);
                stmt.executeUpdate();
            }
        } catch (Exception e) {
            throw new ServletException(e);
        }

        response.sendRedirect("ViewUsersServlet");
    }
}
