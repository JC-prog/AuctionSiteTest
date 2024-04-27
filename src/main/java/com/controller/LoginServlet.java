package com.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Login", urlPatterns = "/login")
public class LoginServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("Login GET request");
		
		getServletContext().getRequestDispatcher("/pages/login.jsp").forward(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("Login GET request");
		
		String uName = request.getParameter("uName");
		String password = request.getParameter("password");
		String role = request.getParameter("role");
		
		if (uName.equals("admin") && password.equals("admin"))
		{
			
			if (role.equals("buyer")) {
				response.sendRedirect(request.getContextPath() + "/pages/buyerHome.jsp");
			} else if (role.equals("seller")) {
				response.sendRedirect(request.getContextPath() + "/pages/sellerHome.jsp");
			}

		} else {
	        
	        String errorMessage = "Authentication failed. Please check your username and password.";
	        
	        request.setAttribute("errorMessage", errorMessage);
	        
	        getServletContext().getRequestDispatcher("/pages/login.jsp").forward(request, response);
	    }
	}
	
}
