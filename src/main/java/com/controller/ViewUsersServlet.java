package com.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.RegisterClass;
import com.util.DBConnectionUtil;

@WebServlet("/ViewUsersServlet")
public class ViewUsersServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<RegisterClass> users = new ArrayList<>();

        String sql = "SELECT uID,uName, uMail, uNum, uAddress, isActive FROM user";

        try (Connection connection = DBConnectionUtil.getDBConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                RegisterClass user = new RegisterClass();
                user.setuId(resultSet.getString("uID"));
                user.setuName(resultSet.getString("uName"));
                user.setuMail(resultSet.getString("uMail"));
                user.setuNum(resultSet.getString("uNum"));
                user.setuAddress(resultSet.getString("uAddress"));
                user.setisActive(resultSet.getBoolean("isActive"));
                users.add(user);
            }
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("users", users);
        request.getRequestDispatcher("/pages/viewusers.jsp").forward(request, response);
    }
}
