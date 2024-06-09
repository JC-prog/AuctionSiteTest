package com.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.model.Watchlist;

@WebServlet("/GetWatchlistServlet")
public class GetWatchlistServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetWatchlistServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		   
		HttpSession session = request.getSession();
	        String buyerID = (String) session.getAttribute("uID"); // Assuming buyerID is stored in session
	        List<Watchlist> watchlist = new ArrayList<>();

	        try (Connection conn = getDBConnection()) 
	        {
	            // Check for duplicates
	            String checkSql = "SELECT * FROM Watchlist WHERE BuyerID = ? AND isActive = TRUE";
	            String sql = "SELECT * FROM Watchlist WHERE BuyerID = ? AND isActive = TRUE";
	            try (PreparedStatement stmt = conn.prepareStatement(sql)) 
	            {
	                stmt.setString(1, buyerID);
	                try (ResultSet rs = stmt.executeQuery()) 
	                {
	                	while (rs.next()) 
	                	{
	                		Watchlist item = new Watchlist();
	                		item.setWatchlistID(rs.getInt("WatchlistID"));
	                		item.setBuyerID(rs.getString("BuyerID"));
	                		item.setItemNo(rs.getInt("ItemNo"));
	                		item.setTimestamp(rs.getTimestamp("Timestamp"));
	                		item.setActive(rs.getBoolean("isActive"));
	                		watchlist.add(item);
	                	}
	                
	                } catch (SQLException e) {
	                    throw new ServletException(e);
	                }
	            }
	       } catch (SQLException e1) {
			// TODO Auto-generated catch block
	    	   throw new ServletException(e1);
		}
	        request.setAttribute("watchlist", watchlist);
	        request.getRequestDispatcher("/pages/viewwatchlist.jsp").forward(request, response);
	}

	    

	    private Connection getDBConnection() throws SQLException {
	        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
	        String user = "root";
	        String password = "password";
	        return DriverManager.getConnection(url, user, password);
	    }
}