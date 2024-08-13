package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.BidRequest;
import com.fyp.auction_app.models.Requests.EditItemStatusRequest;
import com.fyp.auction_app.models.Requests.GetUserBidRequest;
import com.fyp.auction_app.models.Response.FetchBidsResponse;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.BidService;
import com.fyp.auction_app.services.ItemService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @Autowired
    private ItemService itemService;



    @GetMapping("/{username}")
    public ResponseEntity<List<FetchBidsResponse>> getUserBids(@PathVariable("username") String username) {
        List<Bid> bids = bidService.findBidsByUsername(username);

        List<FetchBidsResponse> userBids = new ArrayList<>();

        for (Bid bid : bids){
            Optional<Item> itemToAdd = itemService.findItemById(bid.getItemId());

            if (itemToAdd.isPresent()) {
                FetchBidsResponse bidsResponseToAdd = new FetchBidsResponse();
                bidsResponseToAdd.setBidAmount(bid.getBidAmount());
                bidsResponseToAdd.setItemId(itemToAdd.get().getItemId());
                bidsResponseToAdd.setItemTitle(itemToAdd.get().getItemTitle());
                bidsResponseToAdd.setItemStatus(String.valueOf(itemToAdd.get().getStatus()));
                bidsResponseToAdd.setEndDate(itemToAdd.get().getEndDate());

                userBids.add(bidsResponseToAdd);
            }
        }

        return new ResponseEntity<>(userBids, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> createBid(@RequestBody BidRequest bidRequest) {
        Optional<Item> itemOptional = itemService.findItemByItemId(bidRequest.getItemId());

        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();

            if (item.getStatus() == ListingStatus.EXPIRED) {
                return new ResponseEntity<>("Item is expired", HttpStatus.GONE);
            }

            if (bidRequest.getBidAmount() <= item.getCurrentPrice()) {
                return new ResponseEntity<>("Bid amount must be greater than the current price", HttpStatus.BAD_REQUEST);
            }

            if (Objects.equals(bidRequest.getUsername(), item.getSellerName()))
            {
                return new ResponseEntity<>("Cannot bid on own item", HttpStatus.BAD_REQUEST);
            }

            item.setCurrentPrice(bidRequest.getBidAmount());
            itemService.updateItem(item);

            Bid bid = new Bid();
            bid.setBidderName(bidRequest.getUsername());
            bid.setBidAmount(bidRequest.getBidAmount());
            bid.setBidTimestamp(new Date());
            bid.setIsActive(Boolean.TRUE);
            bid.setItemId(item.getItemId());
            bidService.createBid(bid);

            return new ResponseEntity<>("Bid created successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count-bid/{itemId}")
    public ResponseEntity<Long> getNumberOfBids(@PathVariable Integer itemId)
    {
        Long numberOfBids = bidService.getBidCountByItemId(itemId);

        return new ResponseEntity<>(numberOfBids, HttpStatus.OK);
    }

    @GetMapping("/latest-bids")
    public List<Bid> getLatestBids(@RequestParam List<Integer> itemIds) {
        return bidService.getLatestBids(itemIds);
    }

}
