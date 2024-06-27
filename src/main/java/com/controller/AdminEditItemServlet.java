package com.controller;

import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AdminEditItemServlet")
public class AdminEditItemServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        Item item = getItemById(itemNo);
        List<ItemCategory> categoryList = getAllCategories();
        List<Map<String, Object>> auctionTypes = getAllAuctionTypes();
        List<Map<String, Object>> durations = getAllDurations();

        request.setAttribute("item", item);
        request.setAttribute("categoryList", categoryList);
        request.setAttribute("auctionTypes", auctionTypes);
        request.setAttribute("durations", durations);
        RequestDispatcher dispatcher = request.getRequestDispatcher("/pages/adminEditItem.jsp");
        dispatcher.forward(request, response);
    }

    private Item getItemById(int itemNo) throws ServletException {
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        Item item = null;

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                         "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description, " +
                         "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.image " +
                         "FROM Item i " +
                         "JOIN User u ON i.sellerID = u.uID " +
                         "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                         "WHERE i.itemNo = ?";

            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, itemNo);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        item = new Item();
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
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        return item;
    }

    private List<ItemCategory> getAllCategories() throws ServletException {
        List<ItemCategory> categoryList = new ArrayList<>();
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT categoryNo, catName FROM ItemCategory";

            try (PreparedStatement stmt = conn.prepareStatement(sql); ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    ItemCategory category = new ItemCategory();
                    category.setCategoryNo(rs.getInt("categoryNo"));
                    category.setCatName(rs.getString("catName"));
                    categoryList.add(category);
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        return categoryList;
    }

    private List<Map<String, Object>> getAllAuctionTypes() throws ServletException {
        List<Map<String, Object>> auctionTypes = new ArrayList<>();
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT auctionTypeID, name FROM AuctionType WHERE isActive = true";

            try (PreparedStatement stmt = conn.prepareStatement(sql); ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Map<String, Object> auctionType = new HashMap<>();
                    auctionType.put("AuctionTypeID", rs.getInt("auctionTypeID"));
                    auctionType.put("Name", rs.getString("name"));
                    auctionTypes.add(auctionType);
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        return auctionTypes;
    }

    private List<Map<String, Object>> getAllDurations() throws ServletException {
        List<Map<String, Object>> durations = new ArrayList<>();
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT durationID, name FROM DurationPreset WHERE isActive = true";

            try (PreparedStatement stmt = conn.prepareStatement(sql); ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Map<String, Object> duration = new HashMap<>();
                    duration.put("DurationID", rs.getInt("durationID"));
                    duration.put("Name", rs.getString("name"));
                    durations.add(duration);
                }
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        return durations;
    }
}
