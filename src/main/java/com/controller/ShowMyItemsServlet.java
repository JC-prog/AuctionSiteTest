package com.controller;

import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.model.AuctionType;
import com.model.Condition;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;

@WebServlet("/ShowMyItemsServlet")
public class ShowMyItemsServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String currentUserID = (String) session.getAttribute("uID");
        System.out.println("doGet ShowmyItemsServlet");

        // Replace with your method to get items by seller ID and statuses
        List<Item> myItems = getItemsBySellerIDAndStatus(currentUserID);

        request.setAttribute("myItems", myItems);
        request.getRequestDispatcher("/pages/myitems.jsp").forward(request, response);
    }

    // Implement this method to retrieve items from the database
	 private List<Item> getItemsBySellerIDAndStatus(String sellerID) 
	 {
	        List<Item> items = new ArrayList<>();
	        try {
	            // Establish database connection
	            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
	            String user = "root";
	            String password = "password";
	            Connection conn = DriverManager.getConnection(url, user, password);

	            // Prepare SQL statement to retrieve items listed by the current user
	            String sql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
	                    "c.categoryNo, c.catName AS categoryName, i.`condition`, i.description,con.conditionID, con.name AS conditionName, " +
	                    "a.auctionTypeID, a.name AS auctionTypeName, " +
	                    "d.durationID, d.name AS durationPresetName, d.hours, " +
	                    "i.startDate, i.endDate, i.startPrice, i.minSellPrice, i.listingStatus, i.isActive, i.image " +
	                    "FROM Item i " +
	                    "JOIN User u ON i.sellerID = u.uID " +
	                    "JOIN ItemCategory c ON i.categoryNo = c.categoryNo " +
	                    "JOIN AuctionType a ON i.auctionType = a.auctionTypeID " +
	                    "JOIN ItemCondition con ON i.condition = con.conditionID " +
	                    "JOIN DurationPreset d ON i.durationPreset = d.durationID " +
	                    "WHERE i.sellerID = ? AND i.isActive = TRUE order by i.listingStatus" ;
	            PreparedStatement stmt = conn.prepareStatement(sql);
	            stmt.setString(1, sellerID);
	            ResultSet rs = stmt.executeQuery();

	            // Iterate through the result set and populate the userItems list
	            while (rs.next()) {
	                Item item = new Item();
	                // Populate item details from the result set
	                item.setItemNo(rs.getInt("itemNo"));
	                item.setTitle(rs.getString("title"));
	                RegisterClass seller = new RegisterClass();
	                seller.setuId(rs.getString("sellerID"));
	                seller.setuName(rs.getString("sellerName"));
	                seller.setuMail(rs.getString("sellerEmail"));
	                item.setSeller(seller);

	                item.setTitle(rs.getString("title"));

	                ItemCategory category = new ItemCategory(rs.getInt("categoryNo"),rs.getString("categoryName"),true);
	                //temCategory category = new ItemCategory();
	                //category.setCategoryNo(rs.getInt("categoryNo"));
	                //category.setCatName(rs.getString("categoryName"));
	                item.setCategory(category);

	                Condition condition = new Condition(rs.getInt("conditionID"), rs.getString("conditionName"), true);
	                item.setCondition(condition);
	                item.setDescription(rs.getString("description"));

	                AuctionType auctionType = new AuctionType();
	                auctionType.setAuctionTypeID(rs.getInt("auctionTypeID"));
	                auctionType.setName(rs.getString("auctionTypeName"));
	                item.setAuctionType(auctionType);
	                
	                
	                DurationPreset durationPreset = new DurationPreset(rs.getInt("durationID"),rs.getString("durationPresetName"),rs.getInt("hours"),true);
	                //DurationPreset durationPreset = new DurationPreset();
	                //durationPreset.setDurationID(rs.getInt("durationID"));
	                //durationPreset.setName(rs.getString("durationPresetName"));
	                //durationPreset.setHours(rs.getInt("hours"));
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

	                
	                items.add(item);
	            }

	            // Close result set, statement, and connection
	            rs.close();
	            stmt.close();
	            conn.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	            // Handle exceptions
	        }
	        return items;
	        
	    }
	 }