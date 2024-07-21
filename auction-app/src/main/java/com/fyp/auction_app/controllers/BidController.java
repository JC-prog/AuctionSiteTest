package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.BidRequest;
import com.fyp.auction_app.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping("")
    public ResponseEntity<String> bid(@RequestBody BidRequest bidRequest) {

        Bid newBid = new Bid();

        newBid.setItem_id(bidRequest.getItemId());
        newBid.setBidder_name(bidRequest.getBidder_name());
        newBid.setBid_amount(bidRequest.getBid_amount());
        newBid.setBid_timestamp(new Date());

        bidService.createBid(newBid);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
