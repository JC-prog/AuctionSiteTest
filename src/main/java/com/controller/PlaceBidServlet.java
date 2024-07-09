package com.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@WebServlet(name = "PlaceBidServlet", urlPatterns = "/placebid")
public class PlaceBidServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
	/*
	 * protected void doGet(HttpServletRequest request, HttpServletResponse
	 * response) throws ServletException, IOException {
	 * System.out.println("PlaceBidServlet GET request");
	 * getServletContext().getRequestDispatcher("/pages/viewlisting.jsp").forward(
	 * request, response); }
	 */

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 	
    	
        HttpSession session = request.getSession();
        
        String bidderID = (String) session.getAttribute("uID"); // Assuming the user is logged in and you have the uid
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        BigDecimal bidAmount = new BigDecimal(request.getParameter("bidAmount"));
        Timestamp timestamp = new Timestamp(new Date().getTime());

        boolean isBidSuccessful = false;
        String errorMessage = null;

        try {
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);

            // Check the item's start price
            String startPriceQuery = "SELECT startPrice FROM Item WHERE itemNo = ?";
            PreparedStatement startPriceStmt = conn.prepareStatement(startPriceQuery);
            startPriceStmt.setInt(1, itemNo);
            ResultSet startPriceRs = startPriceStmt.executeQuery();
            BigDecimal startPrice = BigDecimal.ZERO;
            if (startPriceRs.next()) {
                startPrice = startPriceRs.getBigDecimal("startPrice");
            }
            startPriceRs.close();
            startPriceStmt.close();

            // Check the current highest bid
            String highestBidQuery = "SELECT MAX(bidAmount) AS highestBid FROM Bid WHERE itemNo = ?";
            PreparedStatement highestBidStmt = conn.prepareStatement(highestBidQuery);
            highestBidStmt.setInt(1, itemNo);
            ResultSet highestBidRs = highestBidStmt.executeQuery();
            BigDecimal highestBid = BigDecimal.ZERO;
            
            
            if (highestBidRs.next()) {
            	
            	if(highestBidRs.getBigDecimal("highestBid")!=null)
            	{
                    highestBid = highestBidRs.getBigDecimal("highestBid");
            	}
            }
            highestBidRs.close();
            highestBidStmt.close();




            
            if (bidAmount.compareTo(startPrice) < 0) {
                errorMessage = "Your bid must be higher than the item's start price.";
            }
            else if (bidAmount.compareTo(highestBid) <= 0)  {
                errorMessage = "Your bid must be higher than the current highest bid.";
            } 
            else {
                // Insert the new bid
                String insertBidQuery = "INSERT INTO Bid (bidderID, itemNo, bidAmount, timestamp, isActive) VALUES (?, ?, ?, ?, ?)";
                PreparedStatement insertBidStmt = conn.prepareStatement(insertBidQuery);
                insertBidStmt.setString(1, bidderID);
                insertBidStmt.setInt(2, itemNo);
                insertBidStmt.setBigDecimal(3, bidAmount);
                insertBidStmt.setTimestamp(4, timestamp);
                insertBidStmt.setBoolean(5, true);
                insertBidStmt.executeUpdate();
                insertBidStmt.close();

                isBidSuccessful = true;
            }

            conn.close();
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("isBidSuccessful", isBidSuccessful);
        request.setAttribute("errorMessage", errorMessage);
        request.getRequestDispatcher("ViewItemServlet?itemNo=" + itemNo).forward(request, response);
    }
}
