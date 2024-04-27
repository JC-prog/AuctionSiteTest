package com.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import com.model.RegisterClass;
import com.service.RegisterInterface;
import com.service.RegisterInterfaceImpl;




@WebServlet(name = "Register", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("Register GET request");
		
		getServletContext().getRequestDispatcher("/pages/register.jsp").forward(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		RequestDispatcher dispatcher = null;	
		
		try {
			
			RegisterClass registerClass = new RegisterClass();
			
			registerClass.setuName(request.getParameter("name"));
			registerClass.setuMail(request.getParameter("email"));
			registerClass.setuPass(request.getParameter("pass"));
			registerClass.setuR_Pass(request.getParameter("re_pass"));
			
			RegisterInterface iRegisterService = new RegisterInterfaceImpl();
			iRegisterService.addUser(registerClass);
			
			request.setAttribute("user", registerClass);
			dispatcher = request.getRequestDispatcher("login");
			dispatcher.forward(request, response);
			} catch (Exception e)
			{
				e.printStackTrace();
			}
		//System.out.println("Register POST request");
		
		//response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
	}
	
}
