package registration.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import registration.dao.SellerDao;
import registration.model.Seller;

@WebServlet(name = "SellerServlet", urlPatterns = "/register")
public class SellerServlet extends HttpServlet {
    static final String REGISTER = "register";
	private static final long serialVersionUID = 1L;
    private SellerDao employeeDao;

    public void init() {
        employeeDao = new SellerDao();
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    	throws ServletException, IOException {
    	
    	System.out.println("A get request was made");
    	
    	getServletContext().getRequestDispatcher("/registration.jsp").forward(request, response);
    	
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        Seller seller = new Seller();
       
        seller.setUsername(username);
        seller.setPassword(password);

        try {
            employeeDao.registerSeller(seller);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        response.sendRedirect("seller.jsp");
    }
}