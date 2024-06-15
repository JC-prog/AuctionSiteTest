package com.controller;

import com.model.Transaction;
import com.model.BuyerTransaction;
import com.model.Item;
import com.model.SellerTransaction;
import com.service.TransactionService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/ViewTransactionServlet")
public class ViewTransactionServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userID = (String) request.getSession().getAttribute("uID");

        
        List<BuyerTransaction> transactionsAsBuyer = TransactionService.transvc.getTransactionsAsBuyer(userID);
        List<SellerTransaction> transactionsAsSeller = TransactionService.transvc.getTransactionsAsSeller(userID);
        List<Item> closedItems = TransactionService.transvc.getAllItemBiddedOn(userID);

        request.setAttribute("transactionsAsBuyer", transactionsAsBuyer);
        request.setAttribute("transactionsAsSeller", transactionsAsSeller);
        request.setAttribute("closedItems", closedItems);

        request.getRequestDispatcher("/pages/viewallbids.jsp").forward(request, response);
    }
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		  String userID = (String) request.getSession().getAttribute("uID");

	        
	        List<BuyerTransaction> transactionsAsBuyer = TransactionService.transvc.getTransactionsAsBuyer(userID);
	        List<SellerTransaction> transactionsAsSeller = TransactionService.transvc.getTransactionsAsSeller(userID);
	        List<Item> closedItems = TransactionService.transvc.getAllItemBiddedOn(userID);

	        request.setAttribute("transactionsAsBuyer", transactionsAsBuyer);
	        request.setAttribute("transactionsAsSeller", transactionsAsSeller);
	        request.setAttribute("closedItems", closedItems);

	        request.getRequestDispatcher("/pages/viewallbids.jsp").forward(request, response);
	    }
}
