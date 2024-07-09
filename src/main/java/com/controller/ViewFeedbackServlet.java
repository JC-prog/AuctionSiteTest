package com.controller;

import com.model.Feedback;
import com.service.FeedbackService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/ViewFeedbackServlet")
public class ViewFeedbackServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        FeedbackService feedbackService = new FeedbackService();
        List<Feedback> feedbackList = feedbackService.getAllFeedback();

        request.setAttribute("feedbackList", feedbackList);
        request.getRequestDispatcher("/pages/adminlistfeedback.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int feedbackID = Integer.parseInt(request.getParameter("feedbackID"));
        FeedbackService feedbackService = new FeedbackService();
        Feedback feedback = feedbackService.getFeedbackById(feedbackID);

        request.setAttribute("feedback", feedback);
        request.getRequestDispatcher("/pages/adminviewfeedback.jsp").forward(request, response);
    }
}
