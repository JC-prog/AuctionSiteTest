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
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

@WebServlet("/SearchItemServlet")
public class SearchItemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String searchQuery = request.getParameter("searchQuery");
        List<Item> itemList = new ArrayList<>();

        try {
            // Database connection details
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);

            String sql;
            PreparedStatement stmt;
            
            if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                sql = "SELECT i.ItemNo, i.Title, i.SellerID, u.uName AS SellerName, u.uMail AS SellerEmail, " +
                      "c.CategoryNo, c.CatName AS CategoryName, i.`Condition`, i.Description, " +
                      "a.AuctionTypeID, a.Name AS AuctionTypeName, " +
                      "d.DurationID, d.Name AS DurationPresetName, d.Hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.ListingStatus, i.isActive, i.Image " +
                      "FROM Item i " +
                      "JOIN User u ON i.SellerID = u.uID " +
                      "JOIN ItemCategory c ON i.CategoryNo = c.CategoryNo " +
                      "JOIN AuctionType a ON i.AuctionType = a.AuctionTypeID " +
                      "JOIN DurationPreset d ON i.DurationPreset = d.DurationID " +
                      "WHERE i.Title LIKE ? OR u.uName LIKE ? OR c.CatName LIKE ? OR i.Description LIKE ? " +
                      "ORDER BY i.startDate ASC";

                stmt = conn.prepareStatement(sql);
                String wildcardQuery = "%" + searchQuery + "%";
                stmt.setString(1, wildcardQuery);
                stmt.setString(2, wildcardQuery);
                stmt.setString(3, wildcardQuery);
                stmt.setString(4, wildcardQuery);
            } else {
                sql = "SELECT i.ItemNo, i.Title, i.SellerID, u.uName AS SellerName, u.uMail AS SellerEmail, " +
                      "c.CategoryNo, c.CatName AS CategoryName, i.`Condition`, i.Description, " +
                      "a.AuctionTypeID, a.Name AS AuctionTypeName, " +
                      "d.DurationID, d.Name AS DurationPresetName, d.Hours, " +
                      "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.ListingStatus, i.isActive, i.Image " +
                      "FROM Item i " +
                      "JOIN User u ON i.SellerID = u.uID " +
                      "JOIN ItemCategory c ON i.CategoryNo = c.CategoryNo " +
                      "JOIN AuctionType a ON i.AuctionType = a.AuctionTypeID " +
                      "JOIN DurationPreset d ON i.DurationPreset = d.DurationID " +
                      "ORDER BY i.startDate ASC";

                stmt = conn.prepareStatement(sql);
            }

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Item item = new Item();
                item.setItemNo(rs.getInt("ItemNo"));

                RegisterClass seller = new RegisterClass();
                seller.setuId(rs.getString("SellerID"));
                seller.setuName(rs.getString("SellerName"));
                seller.setuMail(rs.getString("SellerEmail"));
                item.setSeller(seller);

                item.setTitle(rs.getString("Title"));

                ItemCategory category = new ItemCategory();
                category.setCategoryNo(rs.getInt("CategoryNo"));
                category.setCatName(rs.getString("CategoryName"));
                item.setCategory(category);

                item.setCondition(rs.getString("Condition"));
                item.setDescription(rs.getString("Description"));

                AuctionType auctionType = new AuctionType();
                auctionType.setAuctionTypeID(rs.getInt("AuctionTypeID"));
                auctionType.setName(rs.getString("AuctionTypeName"));
                item.setAuctionType(auctionType);

                DurationPreset durationPreset = new DurationPreset();
                durationPreset.setDurationID(rs.getInt("DurationID"));
                durationPreset.setName(rs.getString("DurationPresetName"));
                durationPreset.setHours(rs.getInt("Hours"));
                item.setDurationPreset(durationPreset);

                item.setStartDate(rs.getTimestamp("startDate"));
                item.setEndDate(rs.getTimestamp("endDate"));
                item.setStartPrice(rs.getBigDecimal("startPrice"));
                item.setMinSellPrice(rs.getBigDecimal("minSellPrice"));
                item.setListingStatus(rs.getString("ListingStatus"));
                item.setActive(rs.getBoolean("isActive"));
                
                // Retrieve image blob
                Blob imageBlob = rs.getBlob("Image");
                if (imageBlob != null) {
                    byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
                    item.setImage(imageBytes);
                }

                itemList.add(item);
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("itemList", itemList);
        request.getRequestDispatcher("/pages/listitems.jsp").forward(request, response);
    }
}
