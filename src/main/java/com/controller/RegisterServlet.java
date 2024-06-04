package com.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import com.model.RegisterClass;
import com.service.RegisterInterface;
import com.service.RegisterInterfaceImpl;
import com.util.CommonUtil;




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
	        
	        // Set other user details from the request parameters
	        registerClass.setuName(request.getParameter("name"));
	        registerClass.setuMail(request.getParameter("email"));
	        registerClass.setuPass(request.getParameter("pass"));
	        registerClass.setuNum(request.getParameter("contact"));
	        registerClass.setuAddress(request.getParameter("address"));
	        registerClass.setisActive(true);
	        registerClass.setisAdmin(false);
	        
	        
	        RegisterInterface iRegisterService = new RegisterInterfaceImpl();
	        // Retrieve existing user IDs
	        ArrayList<String> existingUserIDs = iRegisterService.getAllUserIDs();
	        
	        //for (String userID : existingUserIDs) {
	        //    System.out.println(userID);
	        //}
	        
	        // Generate a new unique user ID
	        String newUserID = CommonUtil.generateIDs(existingUserIDs);
	        System.out.println(newUserID); 
	        // Set the new user ID
	        registerClass.setuId(newUserID);
	        // Add the user using the RegisterInterfaceImpl
	        
	        iRegisterService.addUser(registerClass);
			
			request.setAttribute("user", registerClass);
			// Forward to login page after successful registration
	        dispatcher = request.getRequestDispatcher("index.jsp");
	        dispatcher.forward(request, response);
			} catch (Exception e)
			{
				e.printStackTrace();
			}
		//System.out.println("Register POST request");
		
		//response.sendRedirect(request.getContextPath() + "/pages/login.jsp");
	}
	
}
