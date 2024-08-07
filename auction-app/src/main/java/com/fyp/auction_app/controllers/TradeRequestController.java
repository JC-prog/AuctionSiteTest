package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.services.TradeRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/notification")
public class TradeRequestController {

    @Autowired
    TradeRequestService tradeRequestService;

    public ResponseEntity<String> createTradeRequest()
    {
        TradeRequest tradeRequestToCreate = new TradeRequest();

        tradeRequestService.createTradeRequest(tradeRequestToCreate);

        return new ResponseEntity<>("Trade Request Created", HttpStatus.OK);
    }


}
