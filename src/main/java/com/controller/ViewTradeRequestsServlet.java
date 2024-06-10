package com.controller;

import com.model.TradeRequest;
import com.model.Item;

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

@WebServlet("/ViewTradeRequestsServlet")
public class ViewTradeRequestsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String currentUserID = (String) session.getAttribute("uID");
        System.out.println("doget viewtradrequestserv");

        List<TradeRequest> tradeRequests = new ArrayList<>();

        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        String sql = "SELECT tr.tradeID, tr.buyerID, tr.sellerID, tr.buyerItemID, tr.sellerItemID, tr.status, tr.timestamp, " +
                     "bi.title AS buyerItemTitle, si.title AS sellerItemTitle " +
                     "FROM TradeRequest tr " +
                     "JOIN Item bi ON tr.buyerItemID = bi.itemNo " +
                     "JOIN Item si ON tr.sellerItemID = si.itemNo " +
                     "WHERE tr.buyerID = ? OR tr.sellerID = ? AND tr.isActive = TRUE";

        try (Connection connection = DriverManager.getConnection(url, user, password);
             PreparedStatement stmt = connection.prepareStatement(sql)) {

            stmt.setString(1, currentUserID);
            stmt.setString(2, currentUserID);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                TradeRequest tradeRequest = new TradeRequest();
                tradeRequest.setTradeID(rs.getInt("tradeID"));
                tradeRequest.setBuyerID(rs.getString("buyerID"));
                tradeRequest.setSellerID(rs.getString("sellerID"));
                tradeRequest.setBuyerItemID(rs.getInt("buyerItemID"));
                tradeRequest.setSellerItemID(rs.getInt("sellerItemID"));
                tradeRequest.setStatus(rs.getString("status"));
                tradeRequest.setTimestamp(rs.getTimestamp("timestamp"));
                tradeRequest.setBuyerItemTitle(rs.getString("buyerItemTitle"));
                tradeRequest.setSellerItemTitle(rs.getString("sellerItemTitle"));

                tradeRequests.add(tradeRequest);
            }

            rs.close();
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("tradeRequests", tradeRequests);
        //response.sendRedirect("viewtraderequests.jsp");
        request.getRequestDispatcher("/pages/viewtrades.jsp").forward(request, response);
        //request.getRequestDispatcher("/pages/viewtraderequests.jsp").forward(request, response);
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        System.out.println(action);
        if (action != null) {
            switch (action) {
                case "Accept":
                    // Handle accept trade request
                    // You can retrieve the trade ID from the request parameter
                    String tradeIDAccept = request.getParameter("tradeID");
                    // Call the method to handle accept action
                    handleAcceptTradeRequest(tradeIDAccept);
                    break;
                case "Reject":
                    // Handle reject trade request
                    // You can retrieve the trade ID from the request parameter
                    String tradeIDReject = request.getParameter("tradeID");
                    // Call the method to handle reject action
                    handleRejectTradeRequest(tradeIDReject);
                    break;
                case "Cancel":
                    // Handle cancel trade request
                    // You can retrieve the trade ID from the request parameter
                    String tradeIDCancel = request.getParameter("tradeID");
                    // Call the method to handle cancel action
                    handleCancelTradeRequest(tradeIDCancel);
                    break;
                default:
                    // Handle invalid action
                	//request.getRequestDispatcher("/pages/viewtrades.jsp?error=invalid_action").forward(request, response);
                    response.sendRedirect("ViewTradeRequestsServlet");
                    return;
                  
            }

            //request.getRequestDispatcher("/pages/viewtrades.jsp").forward(request, response);
            response.sendRedirect("ViewTradeRequestsServlet");
        } else {
            // Handle missing action parameter
        	//request.getRequestDispatcher("/pages/viewtrades.jsp?error=missing_action").forward(request, response);
        	response.sendRedirect("ViewTradeRequestsServlet");
        }
    }

    // Method to handle accept trade request
    private void handleAcceptTradeRequest(String tradeID) {
        // Implement logic to accept the trade request with the given trade ID
        // Redirect or forward to appropriate page after processing
    	 try {
    	        // Database connection details
    	        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    	        String user = "root";
    	        String password = "password";

    	        // Establish connection
    	        Connection conn = DriverManager.getConnection(url, user, password);

    	        // Update TradeRequest table to set status to "Accepted"
    	        String updateSql = "UPDATE TradeRequest SET status = 'Accepted' WHERE tradeID = ?";
    	        PreparedStatement updateStmt = conn.prepareStatement(updateSql);
    	        updateStmt.setString(1, tradeID);
    	        updateStmt.executeUpdate();
    	        updateStmt.close();

    	        // Set isActive to FALSE for both buyer and seller items
    	        String deactivateItemsSql = "UPDATE Item SET isActive = FALSE WHERE itemNo IN (SELECT buyerItemID FROM TradeRequest WHERE tradeID = ?) OR itemNo IN (SELECT sellerItemID FROM TradeRequest WHERE tradeID = ?)";
    	        PreparedStatement deactivateStmt = conn.prepareStatement(deactivateItemsSql);
    	        deactivateStmt.setString(1, tradeID);
    	        deactivateStmt.setString(2, tradeID);
    	        deactivateStmt.executeUpdate();
    	        deactivateStmt.close();

    	        // Close connection
    	        conn.close();

    	        // Redirect or forward to appropriate page after processing
    	        
    	    } catch (SQLException e) {
    	        e.printStackTrace();
    	        // Handle database error
    	        
    	    }
    }

    // Method to handle reject trade request
    private void handleRejectTradeRequest(String tradeID) {
        // Implement logic to reject the trade request with the given trade ID
        // Redirect or forward to appropriate page after processing
    	 try {
    	        // Database connection details
    	        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    	        String user = "root";
    	        String password = "password";

    	        // Establish connection
    	        Connection conn = DriverManager.getConnection(url, user, password);

    	        // Update TradeRequest table to set status to "Rejected"
    	        String updateSql = "UPDATE TradeRequest SET status = 'Rejected' WHERE tradeID = ?";
    	        PreparedStatement updateStmt = conn.prepareStatement(updateSql);
    	        updateStmt.setString(1, tradeID);
    	        updateStmt.executeUpdate();
    	        updateStmt.close();

    	        // Close connection
    	        conn.close();

    	        // Redirect or forward to appropriate page after processing
    	    } catch (SQLException e) {
    	        e.printStackTrace();
    	        // Handle database error
    	    }
    }

    // Method to handle cancel trade request
    private void handleCancelTradeRequest(String tradeID) {
        // Implement logic to cancel the trade request with the given trade ID
        // Redirect or forward to appropriate page after processing
    	 try {
    	        // Database connection details
    	        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    	        String user = "root";
    	        String password = "password";

    	        // Establish connection
    	        Connection conn = DriverManager.getConnection(url, user, password);

    	        // Update TradeRequest table to set status to "Cancelled"
    	        String updateSql = "UPDATE TradeRequest SET status = 'Cancelled' WHERE tradeID = ?";
    	        PreparedStatement updateStmt = conn.prepareStatement(updateSql);
    	        updateStmt.setString(1, tradeID);
    	        updateStmt.executeUpdate();
    	        updateStmt.close();

    	        // Close connection
    	        conn.close();

    	        // Redirect or forward to appropriate page after processing
    	    } catch (SQLException e) {
    	        e.printStackTrace();
    	        // Handle database error
    	    }
    }

}
