package com.controller;

import com.service.TransactionService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ReceivedItemServlet")
public class ReceivedItemServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String transactionID = request.getParameter("transactionID");

        boolean isUpdated = TransactionService.transvc.updateTransactionStatus(transactionID, "Item Received");
        if (isUpdated) {
            request.setAttribute("message", "Item marked as received successfully.");
        } else {
            request.setAttribute("message", "Failed to mark item as received.");
        }
        response.sendRedirect(request.getContextPath() + "/ViewTransactionServlet");
    }
}
