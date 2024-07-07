package com.controller;

import com.model.RegisterClass;
import com.service.RegisterClassService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/UpdateProfileServlet")
public class UpdateProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("uID");

        if (userId != null) {
            RegisterClassService userService = new RegisterClassService();
            RegisterClass user = userService.getUserById(userId);
            request.setAttribute("user", user);
            request.getRequestDispatcher("/pages/updateprofile.jsp").forward(request, response);
        } else {
            response.sendRedirect("login.jsp"); // Redirect to login if user is not logged in
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("uID");

        if (userId != null) {
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String address = request.getParameter("address");
            String deactivate = request.getParameter("deactivate");

            RegisterClassService userService = new RegisterClassService();

            if (deactivate != null && deactivate.equals("true")) {
                userService.deactivateUser(userId);
                session.invalidate(); // Logout the user
                response.sendRedirect(request.getContextPath() + "/index.jsp"); // Redirect to index.jsp
                return;
            }

            RegisterClass user = new RegisterClass();
            user.setuId(userId);
            user.setuName(name);
            user.setuMail(email);
            user.setuPass(password);
            user.setuAddress(address);

            userService.updateUser(user);

            response.sendRedirect("ListItemsServlet"); // Redirect back to the item listing page after updating
        } else {
            response.sendRedirect("LoginServlet"); // Redirect to login if user is not logged in
        }
    }
}
