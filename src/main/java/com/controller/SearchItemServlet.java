package com.controller;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.AuctionType;
import com.model.Condition;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

@WebServlet("/SearchItemServlet")
public class SearchItemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String searchQuery = request.getParameter("searchQuery");
        List<Item> itemList = new ArrayList<>();

        String uID = (String) request.getSession().getAttribute("uID");
        boolean isAdmin = false;

        // Check if the user is an admin
        if (uID != null) {
            try (Connection conn = getConnection()) {
                PreparedStatement stmt = conn.prepareStatement("SELECT isAdmin FROM user WHERE uID = ?");
                stmt.setString(1, uID);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    isAdmin = rs.getBoolean("isAdmin");
                }
                rs.close();
                stmt.close();
            } catch (Exception e) {
                throw new ServletException(e);
            }
        }

        try (Connection conn = getConnection()) {
            PreparedStatement stmt = prepareStatement(conn, searchQuery, isAdmin);
            ResultSet rs = stmt.executeQuery();
            itemList = processResultSet(rs);
            rs.close();
            stmt.close();
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("itemList", itemList);

        // Redirect to appropriate page based on user type
        if (isAdmin) {
            request.getRequestDispatcher("/pages/adminhome.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("/pages/listitems.jsp").forward(request, response);
        }
    }

    private Connection getConnection() throws Exception {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    private PreparedStatement prepareStatement(Connection conn, String searchQuery, boolean isAdmin) throws Exception {
        String sql;
        PreparedStatement stmt;

        if (isAdmin) {
            // Admins can see all items
            if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                      "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, i.description, " +
                      "a.auctionTypeID, a.name AS auctionTypeName, " +
                      "d.durationID, d.name AS durationPresetName, d.hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                      "FROM Item i " +
                      "JOIN User u ON i.sellerID = u.uID " +
                      "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                      "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                      "JOIN ItemCondition con ON i.condition = con.conditionID " +
                      "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                      "WHERE i.title LIKE ? OR u.uName LIKE ? OR c.catName LIKE ? OR i.description LIKE ? OR con.name LIKE ? " +
                      "ORDER BY i.startDate ASC";
                stmt = conn.prepareStatement(sql);
                String wildcardQuery = "%" + searchQuery + "%";
                stmt.setString(1, wildcardQuery);
                stmt.setString(2, wildcardQuery);
                stmt.setString(3, wildcardQuery);
                stmt.setString(4, wildcardQuery);
                stmt.setString(5, wildcardQuery);
            } else {
                sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                      "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, i.description, " +
                      "a.auctionTypeID, a.name AS auctionTypeName, " +
                      "d.durationID, d.name AS durationPresetName, d.hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                      "FROM Item i " +
                      "JOIN User u ON i.sellerID = u.uID " +
                      "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                      "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                      "JOIN ItemCondition con ON i.condition = con.conditionID " +
                      "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                      "ORDER BY i.startDate ASC";
                stmt = conn.prepareStatement(sql);
            }
        } else {
            // Regular users only see published and active items
            if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                      "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, i.description, " +
                      "a.auctionTypeID, a.name AS auctionTypeName, " +
                      "d.durationID, d.name AS durationPresetName, d.hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                      "FROM Item i " +
                      "JOIN User u ON i.sellerID = u.uID " +
                      "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                      "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                      "JOIN ItemCondition con ON i.condition = con.conditionID " +
                      "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                      "WHERE (i.title LIKE ? OR u.uName LIKE ? OR c.catName LIKE ? OR i.description LIKE ? OR con.name LIKE ?) " +
                      "AND i.listingStatus = 'Publish' AND i.isActive = TRUE " +
                      "ORDER BY i.startDate ASC";
                stmt = conn.prepareStatement(sql);
                String wildcardQuery = "%" + searchQuery + "%";
                stmt.setString(1, wildcardQuery);
                stmt.setString(2, wildcardQuery);
                stmt.setString(3, wildcardQuery);
                stmt.setString(4, wildcardQuery);
                stmt.setString(5, wildcardQuery);
            } else {
                sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                      "c.categoryNo, c.catName AS categoryName, i.description, con.conditionID, con.name AS conditionName," +
                      "a.auctionTypeID, a.name AS auctionTypeName, " +
                      "d.durationID, d.name AS durationPresetName, d.hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                      "FROM Item i " +
                      "JOIN User u ON i.sellerID = u.uID " +
                      "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                      "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                      "JOIN ItemCondition con ON i.condition = con.conditionID " +
                      "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
                      "WHERE i.listingStatus = 'Publish' AND i.isActive = TRUE " +
                      "ORDER BY i.startDate ASC";
                stmt = conn.prepareStatement(sql);
            }
        }

        return stmt;
    }

    private List<Item> processResultSet(ResultSet rs) throws Exception {
        List<Item> itemList = new ArrayList<>();

        while (rs.next()) {
            Item item = new Item();
            item.setItemNo(rs.getInt("itemNo"));

            RegisterClass seller = new RegisterClass();
            seller.setuId(rs.getString("sellerID"));
            seller.setuName(rs.getString("sellerName"));
            seller.setuMail(rs.getString("sellerEmail"));
            item.setSeller(seller);

            item.setTitle(rs.getString("title"));

            ItemCategory category = new ItemCategory(rs.getInt("categoryNo"), rs.getString("categoryName"), true);
            item.setCategory(category);

            Condition condition = new Condition(rs.getInt("conditionID"), rs.getString("conditionName"), true);
            item.setCondition(condition);
            item.setDescription(rs.getString("description"));

            AuctionType auctionType = new AuctionType();
            auctionType.setAuctionTypeID(rs.getInt("auctionTypeID"));
            auctionType.setName(rs.getString("auctionTypeName"));
            item.setAuctionType(auctionType);

            DurationPreset durationPreset = new DurationPreset(rs.getInt("durationID"), rs.getString("durationPresetName"), rs.getInt("hours"), true);
            item.setDurationPreset(durationPreset);

            item.setStartDate(rs.getTimestamp("startDate"));
            item.setEndDate(rs.getTimestamp("endDate"));
            item.setStartPrice(rs.getBigDecimal("startPrice"));
            item.setMinSellPrice(rs.getBigDecimal("minSellPrice"));
            item.setListingStatus(rs.getString("listingStatus"));
            item.setActive(rs.getBoolean("isActive"));

            Blob imageBlob = rs.getBlob("image");
            if (imageBlob != null) {
                byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
                item.setImage(imageBytes);
            }

            itemList.add(item);
        }

        return itemList;
    }
}
