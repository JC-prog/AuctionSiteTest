package com.controller;

import com.service.TransactionService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ConfirmSellServlet")
public class ConfirmSellServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String transactionID = request.getParameter("transactionID");
        String action = request.getParameter("action");

        TransactionService transactionService = TransactionService.transvc;

        boolean isUpdated = false;
        if ("complete".equals(action)) {
            isUpdated = transactionService.updateTransactionStatus(transactionID, "Completed");
        } else if ("reject".equals(action)) {
            isUpdated = transactionService.updateTransactionStatus(transactionID, "Unsold");
        }

        if (isUpdated) {
        	response.sendRedirect(request.getContextPath() + "/ViewTransactionServlet");
            //response.sendRedirect("viewallbids.jsp");
        } else {
            response.getWriter().write("Failed to update transaction status.");
        }
    }
}
