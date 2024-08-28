package com.test;

import com.controller.ListItemsServlet;
import com.model.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;

public class ListItemsServletTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private RequestDispatcher requestDispatcher;

    private ListItemsServlet listItemsServlet;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        listItemsServlet = new ListItemsServlet();
    }

    @Test
    public void testDoGet() throws Exception {
        // Prepare test data
        List<Item> itemList = new ArrayList<>();
        
        Item item = new Item();
        item.setItemNo(1);
        
        RegisterClass seller = new RegisterClass();
        seller.setuId("sellerId");
        seller.setuName("Seller Name");
        seller.setuMail("seller@example.com");
        item.setSeller(seller);
        
        item.setTitle("Test Item");
        
        ItemCategory category = new ItemCategory();
        category.setCategoryNo(1);
        category.setCatName("Test Category");
        item.setCategory(category);
        
        item.setCondition("New");
        item.setDescription("Test Description");
        
        AuctionType auctionType = new AuctionType();
        auctionType.setAuctionTypeID(1);
        auctionType.setName("Standard");
        item.setAuctionType(auctionType);
        
        DurationPreset durationPreset = new DurationPreset();
        durationPreset.setDurationID(1);
        durationPreset.setName("24 Hours");
        durationPreset.setHours(24);
        item.setDurationPreset(durationPreset);
        
        item.setStartDate(new Timestamp(new Date().getTime()));
        item.setEndDate(new Timestamp(new Date().getTime() + 86400000)); // 24 hours later
        item.setStartPrice(new BigDecimal("100.00"));
        item.setMinSellPrice(new BigDecimal("150.00"));
        item.setListingStatus("Published");
        item.setActive(true);
        item.setImage(null);
        
        itemList.add(item);

        // Mocking
        when(request.getRequestDispatcher("/pages/listitems.jsp")).thenReturn(requestDispatcher);
        doNothing().when(request).setAttribute("itemList", itemList);

        // Invoke the servlet
        listItemsServlet.doGet(request, response);

        // Verification
        verify(request).setAttribute("itemList", itemList);
        verify(request, times(1)).getRequestDispatcher("/pages/listitems.jsp");
        verify(requestDispatcher).forward(request, response);
    }
}
