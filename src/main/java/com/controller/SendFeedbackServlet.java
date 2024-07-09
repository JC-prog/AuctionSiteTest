package com.controller;

import com.service.FeedbackService;
import com.service.RegisterClassService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/SendFeedbackServlet")
public class SendFeedbackServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/pages/sendfeedback.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String senderID = (String) request.getSession().getAttribute("uID");
        
        // Fetch the email from the user table
        RegisterClassService userService = new RegisterClassService();
        String senderEmail = userService.getUserEmailById(senderID);
        
        String subject = request.getParameter("subject");
        String message = request.getParameter("message");

        FeedbackService feedbackService = new FeedbackService();
        feedbackService.addFeedback(senderID, senderEmail, subject, message);

        response.sendRedirect("ListItemsServlet");
    }
}
