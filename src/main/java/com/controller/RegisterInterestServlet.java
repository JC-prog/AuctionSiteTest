package com.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.ItemCategory;
import com.service.ItemCategoryDAO;
import com.service.UserPreferencesDAO;

@WebServlet("/RegisterInterestServlet")
public class RegisterInterestServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ItemCategoryDAO itemCategoryDAO = new ItemCategoryDAO();
        List<ItemCategory> categories = null;
        try {
            categories = itemCategoryDAO.getAllCategories();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        request.setAttribute("categories", categories);
        request.getRequestDispatcher("/pages/registerinterest.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String uID = (String) session.getAttribute("uID");
        String[] selectedCategories = request.getParameterValues("categories");

        if (uID != null && selectedCategories != null) {
            UserPreferencesDAO preferencesDAO = new UserPreferencesDAO();
            try {
                // Log preference scores for selected categories
                for (String category : selectedCategories) {
                    preferencesDAO.logUserPreference(uID, Integer.parseInt(category), 10.0);
                }
            } catch (NumberFormatException e) {
                throw new ServletException("Invalid category number format", e);
            } catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }

        response.sendRedirect(request.getContextPath() + "/ListItemsServlet");
    }
}
