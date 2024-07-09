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
import com.model.Condition;
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
                    "i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
                    "c.categoryNo, c.catName AS categoryName, con.conditionID, con.name AS conditionName, " +
                    "i.description, a.auctionTypeID, a.name AS auctionTypeName, " +
                    "d.durationID, d.name AS durationPresetName, d.hours, " +
                    "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
                    "FROM Item i " +
                    "JOIN User u ON i.sellerID = u.uID " +
                    "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
                    "JOIN ItemCondition con ON i.condition = con.conditionID " +
                    "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
                    "JOIN DurationPreset d ON i.durationPreset = d.durationID WHERE i.isActive = TRUE AND i.listingStatus ='Publish'"
                );

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

                // Retrieve image blob
                Blob imageBlob = rs.getBlob("image");
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
