package com.controller;

import com.model.Item;
import com.service.ItemService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/RecommendItemServlet")
public class RecommendItemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private ItemService itemService;

    public RecommendItemServlet() {
        this.itemService = new ItemService();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String userId = (String) request.getSession().getAttribute("uID");
        if (userId != null) {
            List<Item> recommendedItems = itemService.getRecommendedItems(userId);
            request.setAttribute("recommendedItems", recommendedItems);
            request.getRequestDispatcher("/pages/RecommendedItems.jsp").forward(request, response);
        } else {
            response.sendRedirect("login.jsp");
        }
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
    
   
}
