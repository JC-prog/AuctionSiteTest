package com.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@WebServlet("/PopulateDropdownsServlet")
public class PopulateDropdownsServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        try (PrintWriter out = response.getWriter();
             Connection conn = getDBConnection();
             Statement stmt = conn.createStatement()) {

            out.println("<html><body>");
            out.println("<form action='CreateItemServlet' method='post'>");

            // Populate Item Category dropdown
            out.println("<label for='category'>Category:</label>");
            out.println("<select id='category' name='category' required>");
            ResultSet rs = stmt.executeQuery("SELECT CategoryNo, CatName FROM ItemCategory WHERE isActive = true");
            while (rs.next()) {
                out.println("<option value='" + rs.getInt("CategoryNo") + "'>" + rs.getString("CatName") + "</option>");
            }
            out.println("</select><br>");

            // Populate Auction Type dropdown
            out.println("<label for='auctionType'>Auction Type:</label>");
            out.println("<select id='auctionType' name='auctionType' required>");
            rs = stmt.executeQuery("SELECT AuctionTypeID, Name FROM AuctionType WHERE isActive = true");
            while (rs.next()) {
                out.println("<option value='" + rs.getInt("AuctionTypeID") + "'>" + rs.getString("Name") + "</option>");
            }
            out.println("</select><br>");

            // Populate Duration Preset dropdown
            out.println("<label for='durationPreset'>Duration:</label>");
            out.println("<select id='durationPreset' name='durationPreset' required>");
            rs = stmt.executeQuery("SELECT DurationID, Name FROM DurationPreset WHERE isActive = true");
            while (rs.next()) {
                out.println("<option value='" + rs.getInt("DurationID") + "'>" + rs.getString("Name") + "</option>");
            }
            out.println("</select><br>");

            // Continue with the rest of the form
            out.println("<label for='title'>Title:</label>");
            out.println("<input type='text' id='title' name='title' required><br>");

            out.println("<label for='condition'>Condition:</label>");
            out.println("<input type='text' id='condition' name='condition' required><br>");

            out.println("<label for='description'>Description:</label>");
            out.println("<textarea id='description' name='description' required></textarea><br>");

            out.println("<label for='startDate'>Start Date:</label>");
            out.println("<input type='datetime-local' id='startDate' name='startDate' required><br>");

            out.println("<label for='endDate'>End Date:</label>");
            out.println("<input type='datetime-local' id='endDate' name='endDate' required><br>");

            out.println("<label for='startPrice'>Start Price:</label>");
            out.println("<input type='number' step='0.01' id='startPrice' name='startPrice' required><br>");

            out.println("<label for='minSellPrice'>Min Sell Price:</label>");
            out.println("<input type='number' step='0.01' id='minSellPrice' name='minSellPrice' required><br>");

            out.println("<label for='listingStatus'>Listing Status:</label>");
            out.println("<input type='text' id='listingStatus' name='listingStatus' required><br>");

            out.println("<input type='submit' value='Create Listing'>");
            out.println("</form>");
            out.println("</body></html>");
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }

    private Connection getDBConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC";
        String user = "root";
        String password = "password";
        return DriverManager.getConnection(url, user, password);
    }
}
