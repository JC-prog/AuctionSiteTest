package com.controller;
import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@WebServlet(name = "CreateItem", urlPatterns = "/createItem")
public class CreateItemServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("CreateItem GET request");
		
		getServletContext().getRequestDispatcher("/pages/createItem.jsp").forward(request, response);
		
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("I reach create serverlet");
		
        String title = request.getParameter("title");
        int categoryNo = Integer.parseInt(request.getParameter("category"));
        String condition = request.getParameter("condition");
        String description = request.getParameter("description");
        int auctionType = Integer.parseInt(request.getParameter("auctionType"));
        int durationPreset = Integer.parseInt(request.getParameter("durationPreset"));
        Date startDate = parseDate(request.getParameter("startDate"));
        Date endDate = parseDate(request.getParameter("endDate"));
        BigDecimal startPrice = new BigDecimal(request.getParameter("startPrice"));
        BigDecimal minSellPrice = new BigDecimal(request.getParameter("minSellPrice"));
        String listingStatus = request.getParameter("listingStatus");
        boolean isActive = true;
        HttpSession session = request.getSession();
        System.out.println("User: " + (String)session.getAttribute("uID"));
        System.out.println("Title: " + title);
        System.out.println("Category No: " + categoryNo);
        System.out.println("Condition: " + condition);
        System.out.println("Description: " + description);
        System.out.println("Auction Type: " + auctionType);
        System.out.println("Duration Preset: " + durationPreset);
        System.out.println("Start Date: " + startDate);
        System.out.println("End Date: " + endDate);
        System.out.println("Start Price: " + startPrice);

        // Assuming a connection method getDBConnection()
        try (Connection conn = getDBConnection()) {
            String sql = "INSERT INTO Item (SellerID, Title, CategoryNo,`Condition`, Description, AuctionType, DurationPreset, startDate, endDate, startPrice, minSellPrice, ListingStatus, isActive) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                // Assuming SellerID is from a session or another source
            	
                stmt.setString(1, (String)session.getAttribute("uID")); // Replace with actual seller ID
                stmt.setString(2, title);
                stmt.setInt(3, categoryNo);
                stmt.setString(4, condition);
                stmt.setString(5, description);
                stmt.setInt(6, auctionType);
                stmt.setInt(7, durationPreset);
                stmt.setTimestamp(8, new java.sql.Timestamp(startDate.getTime()));
                stmt.setTimestamp(9, new java.sql.Timestamp(endDate.getTime()));
                stmt.setBigDecimal(10, startPrice);
                stmt.setBigDecimal(11, minSellPrice);
                stmt.setString(12, listingStatus);
                stmt.setBoolean(13, isActive);

                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        response.sendRedirect("success.jsp"); // Redirect to a success page
    }

    private Date parseDate(String dateStr) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }
}
