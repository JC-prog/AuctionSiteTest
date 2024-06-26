package com.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.LoginClass;
import com.service.LoginValidate;
import com.service.User;

@WebServlet(name = "Login", urlPatterns = "/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private LoginValidate loginVal;

    public void init() {
        loginVal = new LoginValidate();
    }

    public LoginServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Login GET request");
        getServletContext().getRequestDispatcher("/pages/login.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        String uName = request.getParameter("uName");
        String uPass = request.getParameter("password");

        LoginClass loginClass = new LoginClass();
        loginClass.setuName(uName);
        loginClass.setuPass(uPass);

        try {
            User user = loginVal.validate(loginClass);
            if (user != null) {
                HttpSession session = request.getSession();
                if (session != null) {
                    System.out.println("login success");
                    session.setAttribute("uName", uName);
                    session.setAttribute("uID", user.getUserId());
                    if (user.isAdmin()) {
                        //response.sendRedirect("adminhome.jsp");
                    	request.getRequestDispatcher("/pages/adminhome.jsp").forward(request, response);
                    } else {
                        response.sendRedirect("ListItemsServlet");
                    }
                }
            } else {
                request.setAttribute("errMessage", "Invalid login credentials.");
                request.getRequestDispatcher("invalidLogin.jsp").forward(request, response);
                System.out.println("login failed");
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
