package com.controller;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@WebServlet(name = "CreateItem", urlPatterns = "/createItem")
//@WebServlet("/CreateItemServlet")
@MultipartConfig
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
		
		 // Retrieve form parameters
		boolean isActive = true; // Initialize isActive
		byte[] image = null;

	    String title = request.getParameter("title");
	    
	    
	    
	    String categoryParam = request.getParameter("category");
	    String condition = request.getParameter("condition");
	    String description = request.getParameter("description");
	    String auctionTypeParam = request.getParameter("auctionType");
	    String durationPresetParam = request.getParameter("durationPreset");
	    
	  
	    String startPriceParam = request.getParameter("startPrice");
	    String minSellPriceParam = request.getParameter("minSellPrice");
	    String listingStatus = request.getParameter("listingStatus");

	    // Validate and parse parameters
	    int categoryNo;
	    int auctionType;
	    int durationPreset;
	    Date startDate= new Date();
	    Date endDate = new Date();
	    BigDecimal startPrice;
	    BigDecimal minSellPrice;
	    try {
	    	
	          System.out.println("Title: " + title);
	          System.out.println("Category No: " + categoryParam);
	          System.out.println("Condition: " + condition);
	          System.out.println("Description: " + description);
	          System.out.println("Auction Type: " + auctionTypeParam);
	          System.out.println("Duration Preset: " + durationPresetParam);
	        categoryNo = Integer.parseInt(categoryParam);
	        auctionType = Integer.parseInt(auctionTypeParam);
	        durationPreset = Integer.parseInt(durationPresetParam);
	       
	        startPrice = new BigDecimal(startPriceParam);
	        minSellPrice = new BigDecimal(minSellPriceParam);
	    } catch (NumberFormatException e) {
	        // Handle invalid input
	        throw new ServletException("Invalid input data", e);
	    }

	    // Handle image
	    Part filePart = request.getPart("image");
	    InputStream imageInputStream = null;
	    if (filePart != null) {
	        imageInputStream = filePart.getInputStream();
	        image = imageInputStream.readAllBytes();
	    }
        
        
        
        HttpSession session = request.getSession();
        System.out.println("User: " + (String)session.getAttribute("uID"));
        System.out.println("Title: " + title);
        System.out.println("Category No: " + categoryNo);
        System.out.println("Condition: " + condition);
        System.out.println("Description: " + description);
        System.out.println("Auction Type: " + auctionType);
        System.out.println("Duration Preset: " + durationPreset);
      
        System.out.println("Start Price: " + startPrice);
        System.out.println("Image: " + filePart.getInputStream());
        System.out.println("listingStatus : " + listingStatus);
        
        
        int durationInHours = getDurationInHoursFromDB(durationPreset);
        if(listingStatus.equals("Publish"))
        {
        	startDate = new Date();
        	endDate = new Date(startDate.getTime()+(durationInHours*3600000));
        	System.out.println("start date =" +startDate);
        	System.out.println("end date =" +endDate);
        }
        else
        {
        	System.out.println("Drafted");
        }

     // Assuming a connection method getDBConnection()
        
        try (Connection conn = getDBConnection()) {
            String sql = "INSERT INTO Item (sellerID, title, categoryNo,`condition`, description, auctionType, durationPreset, startDate, endDate, startPrice, minSellPrice, listingStatus, isActive,image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                // Assuming SellerID is from a session or another source

                stmt.setString(1, (String) session.getAttribute("uID")); // Replace with actual seller ID
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
                stmt.setBoolean(13, isActive); // Use isActive variable

                if (imageInputStream != null) {
                    stmt.setBytes(14, image);
                }
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        //response.sendRedirect("success.jsp"); // Redirect to a success page
        response.sendRedirect("ListItemsServlet");

    }

    private Date parseDate(String dateStr) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?sessionVariables=sql_mode='NO_ENGINE_SUBSTITUTION'&jdbcCompliantTruncation=false&serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }
    
    private int getDurationInHoursFromDB(int durationPresetId) throws ServletException {
        int durationInHours = 0;
        try (Connection conn = getDBConnection()) {
            String sql = "SELECT hours FROM DurationPreset WHERE durationId = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, durationPresetId);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        durationInHours = rs.getInt("Hours");
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }
        return durationInHours;
    }
}
