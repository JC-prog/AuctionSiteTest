package com.controller;

import com.service.TransactionService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ShippingItemServlet")
public class ShippingItemServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String transactionID = request.getParameter("transactionID");
        String buyerAddress = request.getParameter("sellerAddress");

        request.setAttribute("transactionID", transactionID);
        request.setAttribute("buyerAddress", buyerAddress);
        request.getRequestDispatcher("pages/shipitem.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String transactionID = request.getParameter("transactionID");

        boolean isUpdated = TransactionService.transvc.updateTransactionStatus(transactionID, "Item Shipped");
        if (isUpdated) {
            request.setAttribute("message", "Item marked as shipped successfully.");
        } else {
            request.setAttribute("message", "Failed to mark item as shipped.");
        }
        response.sendRedirect(request.getContextPath() + "/ViewTransactionServlet");
    }
}
