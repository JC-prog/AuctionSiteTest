package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.DTO.BidDTO;
import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.BidRequest;
import com.fyp.auction_app.models.Requests.EditItemStatusRequest;
import com.fyp.auction_app.models.Requests.GetUserBidRequest;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.BidService;
import com.fyp.auction_app.services.ItemService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/{username}")
    public ResponseEntity<List<BidDTO>> getUserBids(@PathVariable("username") String username) {
        List<BidDTO> bids = bidService.findBidsByUsername(username);

        return new ResponseEntity<>(bids, HttpStatus.OK);
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
            bid.setBidTimestamp(new Date());
            bid.setIsActive(Boolean.TRUE);
            bid.setItem(item);
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

}
