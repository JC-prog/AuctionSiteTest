package com.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.RegisterClass;
import com.service.RegisterInterface;
import com.service.RegisterInterfaceImpl;
import com.util.CommonUtil;

@WebServlet(name = "Register", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/pages/register.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            RegisterClass registerClass = new RegisterClass();

            // Set other user details from the request parameters
            registerClass.setuName(request.getParameter("name"));
            registerClass.setuMail(request.getParameter("email"));
            registerClass.setuPass(request.getParameter("pass"));
            registerClass.setuNum(request.getParameter("contact"));
            registerClass.setuAddress(request.getParameter("address"));
            registerClass.setisActive(true);
            registerClass.setisAdmin(false);

            RegisterInterface iRegisterService = new RegisterInterfaceImpl();
            // Retrieve existing user IDs
            ArrayList<String> existingUserIDs = iRegisterService.getAllUserIDs();

            // Generate a new unique user ID
            String newUserID = CommonUtil.generateIDs(existingUserIDs);
            registerClass.setuId(newUserID);

            // Add the user using the RegisterInterfaceImpl
            iRegisterService.addUser(registerClass);

            // Set the new user ID in session
            HttpSession session = request.getSession();
            session.setAttribute("uID", newUserID);

            // Redirect to the interest selection page
            response.sendRedirect(request.getContextPath() + "/RegisterInterestServlet");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect(request.getContextPath() + "/error.jsp");
        }
    }
}
