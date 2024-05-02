package com.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.LoginClass;
import com.service.LoginValidate;



@WebServlet(name = "Login", urlPatterns = "/login")
public class LoginServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	private LoginValidate loginVal;
	
	public void init() {
		loginVal = new LoginValidate();
	} 
	
	public LoginServlet() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("Login GET request");
		
		getServletContext().getRequestDispatcher("/pages/login.jsp").forward(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		
		String uName = request.getParameter("uName");
		String uPass = request.getParameter("password");
		
		LoginClass loginClass = new LoginClass();
		loginClass.setuName(uName);
		loginClass.setuPass(uPass);
		
		
		String unRegistered = null;
		
		try {
			if (loginVal.validate(loginClass)) {
				//HttpSession session = request.getSession();
                // session.setAttribute("username",username);
				HttpSession session = request.getSession(false);
				if (session !=null) {
					String uName1 = (String)session.getAttribute("uName");
					System.out.println("login success");
				}
				response.sendRedirect("user.jsp");
			}else {
//				session.setAttribute("user", uName);
//                response.sendRedirect("login.jsp");
				request.setAttribute("errMessage", unRegistered);
				request.getRequestDispatcher("invalidLogin.jsp").forward(request, response);

				System.out.println("login failed");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		/*
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
	    */
	}
	
}
