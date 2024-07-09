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
import javax.servlet.http.HttpSession;

import com.model.AuctionType;
import com.model.DurationPreset;
import com.model.Item;
import com.model.ItemCategory;
import com.model.RegisterClass;
import com.service.ItemService;
import com.service.UserPreferencesDAO;
import com.model.Bid;
import com.model.Condition;

@WebServlet("/ViewItemServlet")
public class ViewItemServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private ItemService itemService;
    private UserPreferencesDAO userPreferencesDAO;
    
    public ViewItemServlet() {
        this.itemService = new ItemService();
        this.userPreferencesDAO = new UserPreferencesDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	System.out.println("View Item Serv GET request");
        int itemNo = Integer.parseInt(request.getParameter("itemNo"));
        Item item = null;
        List<Bid> bidList = new ArrayList<>();
        HttpSession session = request.getSession();
        String currentUserID = (String) session.getAttribute("uID");
        


        try {
            // Database connection details
            String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
            String user = "root";
            String password = "password";
            Connection conn = DriverManager.getConnection(url, user, password);

            // Retrieve item details
            String itemSql = "SELECT i.itemNo, i.title, i.sellerID, u.uName AS sellerName, u.uMail AS sellerEmail, " +
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
                             "WHERE i.itemNo = ?";

            PreparedStatement stmt = conn.prepareStatement(itemSql);
            stmt.setInt(1, itemNo);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                item = new Item();
                item.setItemNo(rs.getInt("itemNo"));

                RegisterClass seller = new RegisterClass();
                seller.setuId(rs.getString("sellerID"));
                seller.setuName(rs.getString("sellerName"));
                seller.setuMail(rs.getString("sellerEmail"));
                item.setSeller(seller);

                item.setTitle(rs.getString("title"));

                ItemCategory category = new ItemCategory(rs.getInt("categoryNo"),rs.getString("categoryName"),true);
                //ItemCategory category = new ItemCategory();
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
                durationPreset.setDurationID(rs.getInt("durationID"));
                durationPreset.setName(rs.getString("durationPresetName"));
                durationPreset.setHours(rs.getInt("hours"));
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
            }
            
            // Log user preference
            userPreferencesDAO.logUserPreference(currentUserID, item.getCategory().getCategoryNo(),1.0);

            rs.close();
            stmt.close();

            // Retrieve bid history
            String bidSql = "SELECT b.bidID, b.itemNo, b.bidAmount,b.bidderID, b.timestamp, u.uName AS bidderName " +
                            "FROM Bid b " +
                            "JOIN User u ON b.bidderID = u.uID " +
                            "WHERE b.itemNo = ? AND b.isActive = true " +
                            "ORDER BY b.timestamp DESC";

            stmt = conn.prepareStatement(bidSql);
            stmt.setInt(1, itemNo);
            rs = stmt.executeQuery();

            while (rs.next()) {
				/*
				 * System.out.println(rs.getString("BidderName"));
				 * System.out.println(rs.getString("BidID"));
				 * System.out.println(rs.getString("BidderName"));
				 * System.out.println(rs.getString("BidID"));
				 */
                Bid bid = new Bid();
                bid.setBidID(rs.getInt("bidID"));
                bid.setBidderID(rs.getString("bidderID"));
                bid.setItemNo(rs.getInt("itemNo"));
                bid.setBidAmount(rs.getBigDecimal("bidAmount"));
                bid.setTimestamp(rs.getTimestamp("timestamp"));
                bid.setBidderName(rs.getString("bidderName"));
                bidList.add(bid);
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            throw new ServletException(e);
        }

        request.setAttribute("item", item);
        request.setAttribute("bidList", bidList);
        request.getRequestDispatcher("/pages/viewitem.jsp").forward(request, response);
    }
}
