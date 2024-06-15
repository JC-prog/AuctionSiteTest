package com.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import javax.servlet.ServletException;
import com.model.CreatePaymentResponse;
import com.model.Transaction;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/PaymentServlet")
public class PaymentServlet extends HttpServlet {
	private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//assume all payments are successful
	    Connection conn = null;
	    PreparedStatement updateStmt = null;
	    String ItemNo = request.getParameter("itemNo");
	    
	    System.out.println("Payment Servlet itemno = "+ItemNo);

	    try {
	        // Establish connection
	        conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
	        
	        // Update transaction status to "Payment Made"
	        updatePaymentComplete(conn, ItemNo);
	        
	        // Forward to payment confirmation page
	        //request.getRequestDispatcher("/pages/viewallbids.jsp").forward(request, response);
	        response.sendRedirect(request.getContextPath() + "/ViewTransactionServlet");
	        
	    } catch (Exception ex) {
	        System.out.println(ex);
	        // Handle exceptions
	    } finally {
	        // Close resources
	        if (updateStmt != null) {
	            try {
					updateStmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }
	        if (conn != null) {
	            try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }
	    }
	}	
       
        
		
		
		
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        /*Stripe.apiKey = "sk_test_51PRZT506m6t4vRTRNBEG0nz8TcH5zSp3GXmdywyekMvugo4OeavfGdK8wGBhupdqO3mXXEWIxeUY6tzKxjUyCnpn00pLD9VUb8"; // Replace with your own secret key

        // Get payment details from request parameters
        String stripeToken = request.getParameter("stripeToken");
        String transactionID = request.getParameter("transactionID");
        String itemNo = request.getParameter("itemNo");
        String saleAmountStr = request.getParameter("saleAmount");

        BigDecimal saleAmount = new BigDecimal(saleAmountStr);

        // Create a charge using the Stripe API
        Map<String, Object> params = new HashMap<>();
        params.put("amount", saleAmount.multiply(new BigDecimal("100")).intValue()); // Amount in cents
        params.put("currency", "usd");
        params.put("description", "Payment for item: " + itemNo);
        params.put("source", stripeToken); // Stripe token obtained with Stripe.js

        try {
            Charge charge = Charge.create(params);

            // Payment successful, handle your logic here (e.g., update transaction status)
            // Forward to a payment confirmation page or do other post-payment tasks
            request.setAttribute("transactionID", transactionID);
            request.setAttribute("itemNo", itemNo);
            request.setAttribute("saleAmount", saleAmount);
            request.getRequestDispatcher("/PaymentConfirmation.jsp").forward(request, response);

        } catch (StripeException e) {
            // Payment failed, handle the exception
            request.setAttribute("error", e.getMessage());
            request.getRequestDispatcher("/PaymentError.jsp").forward(request, response);
        }
        */
    




	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
		
		
		  // Retrieve parameters from the request
        String saleAmountStr = request.getParameter("saleAmount");

        // Convert saleAmount from string (e.g., "10.12") to cents as an integer
        double saleAmount = Double.parseDouble(saleAmountStr);
        long amountInCents = (long) (saleAmount * 100); // Stripe requires amount in cents

		Stripe.apiKey = "sk_test_51PRZT506m6t4vRTRNBEG0nz8TcH5zSp3GXmdywyekMvugo4OeavfGdK8wGBhupdqO3mXXEWIxeUY6tzKxjUyCnpn00pLD9VUb8";
		
		PaymentIntentCreateParams params =
		        PaymentIntentCreateParams.builder()
		        .setAmount(amountInCents)
		          //.setAmount(1000L)
		          .setCurrency("sgd")
		      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		          .setAutomaticPaymentMethods(
		            PaymentIntentCreateParams.AutomaticPaymentMethods
		              .builder()
		              .setEnabled(true)
		              .build()
		          )
		          .build();

		      // Create a PaymentIntent with the order amount and currency
		    PaymentIntent paymentIntent;
			try {
				paymentIntent = PaymentIntent.create(params);
			} catch (StripeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return;
			}

		      //CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret());

        System.out.println("transid = "+request.getParameter("transactionID"));
        // Retrieve transaction details from request
        String transactionID = request.getParameter("transactionID");
        String itemNo = request.getParameter("itemNo");

        // Set transaction details as request attributes
        request.setAttribute("transactionID", transactionID);
        request.setAttribute("itemNo", itemNo);
        request.setAttribute("saleAmount", saleAmountStr);
        request.setAttribute("clientSecret", paymentIntent.getClientSecret());

        // Forward request to PaymentDetails.jsp
        request.getRequestDispatcher("/pages/PaymentDetails.jsp").forward(request, response);
    }
	
	private void updatePaymentComplete(Connection conn, String ItemNo) throws SQLException {
	    String sql = "UPDATE Transaction SET Status = 'Payment Made' WHERE ItemNo = ?";
	    try (PreparedStatement stmt = conn.prepareStatement(sql)) {
	        stmt.setString(1, ItemNo);
	        stmt.executeUpdate();
	    }
	}

}
