package com.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.Item;
import com.model.RegisterClass;
import com.model.ItemCategory;
import com.model.AuctionType;
import com.model.DurationPreset;

@WebServlet("/ListItemsServlet")
public class ListItemsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Item> itemList = new ArrayList<>();
        
        try {
            // Database connection details
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);
            
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT " +
                "i.ItemNo, i.Title, i.SellerID, u.uName AS SellerName, u.uMail AS SellerEmail, " +
                "c.CategoryNo, c.CatName AS CategoryName, i.`Condition`, i.Description, " +
                "a.AuctionTypeID, a.Name AS AuctionTypeName, " +
                "d.DurationID, d.Name AS DurationPresetName, d.Hours, " +
                "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.ListingStatus, i.isActive, i.Image " +
                "FROM Item i " +
                "JOIN User u ON i.SellerID = u.uID " +
                "JOIN ItemCategory c ON i.CategoryNo = c.CategoryNo " +
                "JOIN AuctionType a ON i.AuctionType = a.AuctionTypeID " +
                "JOIN DurationPreset d ON i.DurationPreset = d.DurationID");

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
        request.getRequestDispatcher("/pages/home.jsp").forward(request, response);
    }
}
