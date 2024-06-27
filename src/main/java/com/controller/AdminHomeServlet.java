package com.controller;

import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;
import com.service.TaskScheduler;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AdminHomeServlet")
public class AdminHomeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Item> itemList = getAllItems();

        request.setAttribute("itemList", itemList);
        RequestDispatcher dispatcher = request.getRequestDispatcher("/pages/adminhome.jsp");
        dispatcher.forward(request, response);
    }

    private List<Item> getAllItems() throws ServletException {
        List<Item> itemList = new ArrayList<>();
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                         "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description, " +
                         "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.image " +
                         "FROM Item i " +
                         "JOIN User u ON i.sellerID = u.uID " +
                         "JOIN ItemCategory c ON i.categoryNo = c.categoryNo";

            try (PreparedStatement stmt = conn.prepareStatement(sql); ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Item item = new Item();
                    item.setItemNo(rs.getInt("itemNo"));

                    RegisterClass seller = new RegisterClass();
                    seller.setuId(rs.getString("sellerID"));
                    seller.setuName(rs.getString("sellerName"));
                    seller.setuMail(rs.getString("sellerEmail"));
                    item.setSeller(seller);

                    item.setTitle(rs.getString("title"));

                    ItemCategory category = new ItemCategory();
                    category.setCategoryNo(rs.getInt("categoryNo"));
                    category.setCatName(rs.getString("categoryName"));
                    item.setCategory(category);

                    item.setCondition(rs.getString("condition"));
                    item.setDescription(rs.getString("description"));
                    item.setStartDate(rs.getTimestamp("startDate"));
                    item.setEndDate(rs.getTimestamp("endDate"));
                    item.setStartPrice(rs.getBigDecimal("startPrice"));
                    item.setMinSellPrice(rs.getBigDecimal("minSellPrice"));
                    item.setListingStatus(rs.getString("listingStatus"));

                    byte[] image = rs.getBytes("image");
                    if (image != null) {
                        item.setImage(image);
                    }

                    itemList.add(item);
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        return itemList;
    }
}
