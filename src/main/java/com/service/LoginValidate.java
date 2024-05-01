package com.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.model.LoginClass;

public class LoginValidate {

	
	public boolean validate(LoginClass loginClass) throws ClassNotFoundException {
		boolean status = false;
		String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
		String username = "root";
		String password = "password";
/*
 * 	String uemail = request.getParameter("username");
		String upwd = request.getParameter("password");
		HttpSession session = request.getSession();
		RequestDispatcher dispatcher = null;
		
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/company?serverTimezone=UTC","root","Pok5m2ud");
			PreparedStatement pst =con.prepareStatement("Select * from users where uemail = ? and upwd = ?");
			pst.setString(1,uemail);// enter placeholder values
			pst.setString(2,upwd);
			
			ResultSet rs = pst.executeQuery();			
			if(rs.next()) //means user is in DB
			{
				session.setAttribute("name", rs.getString("uname"));
				dispatcher = request.getRequestDispatcher("index.jsp");
			}else
			{
				request.setAttribute("status", "failed");
				dispatcher = request.getRequestDispatcher("login.jsp");
			}
			dispatcher.forward(request, response);
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
 */
		Class.forName("com.mysql.jdbc.Driver");
		
		try (Connection connection = DriverManager.getConnection(url, username, password);
				// Step 2:Create a statement using connection object
//				String sql = "SELECT * FROM user WHERE uName = ? AND uPass = ?";
				PreparedStatement preStmt = connection.prepareStatement("SELECT * FROM user WHERE uName = ? AND uPass = ?" )) {
				preStmt.setString(1, loginClass.getuName());
				preStmt.setString(2, loginClass.getuPass());
				
				System.out.println(preStmt);
				
				ResultSet resultSet = preStmt.executeQuery();
				status = resultSet.next();
			
		} catch (SQLException e) {
			e.printStackTrace();
			printSQLException(e);
		}
		return status;
	}
	
	private void printSQLException(SQLException ex) {
		for (Throwable e: ex ) {
			if (e instanceof SQLException) {
				e.printStackTrace(System.err);
				System.err.println("SQLState: " + ((SQLException) e).getSQLState());
				System.err.println("Error Code : " + ((SQLException) e).getErrorCode());
				System.err.println("Message : " + e.getMessage());
				Throwable t = ex.getCause();
				
				while (t != null) {
					System.out.println("Causse: " + t);
					t = t.getCause();
				}
			}
		}
	}
}
