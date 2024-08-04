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
    public ResponseEntity<Bid> createBid(@RequestBody BidRequest bid)
    {
        Optional<Item> itemToBid = itemService.findItemByItemId(bid.getItemId());

        if (itemToBid.isPresent()) {
            Item itemToUpdate = itemToBid.get();

            if (bid.getBidAmount() > itemToUpdate.getCurrentPrice()) {
                itemToUpdate.setCurrentPrice(bid.getBidAmount());
                itemService.updateItem(itemToUpdate);

                Bid bidToAdd = new Bid();
                bidToAdd.setBidderName(bid.getUsername());
                //bidToAdd.setItemId(bid.getItemId());
                bidToAdd.setBidTimestamp(new Date());
                bidToAdd.setIsActive(Boolean.TRUE);
                bidService.createBid(bidToAdd);

                return new ResponseEntity<>(bidToAdd, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
