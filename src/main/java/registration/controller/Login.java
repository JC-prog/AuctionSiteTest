package registration.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "LoginServlet", urlPatterns = "/login")
public class Login extends HttpServlet{

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	    	throws ServletException, IOException {
	    	
	    	System.out.println("A get request was made");
	    	
	    	getServletContext().getRequestDispatcher("/login.jsp").forward(request, response);
	    	
	    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	    	throws ServletException, IOException {
	
			System.out.println("A post request was made");
		}
}
