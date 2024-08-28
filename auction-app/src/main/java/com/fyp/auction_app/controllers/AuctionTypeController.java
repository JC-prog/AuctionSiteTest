package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.AuctionType;
import com.fyp.auction_app.services.AuctionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuctionTypeController {

    @Autowired
    private AuctionTypeService auctionTypeService;

    @GetMapping("api/auction-types")
    public ResponseEntity<List<AuctionType>> getAllUsers() {
        List<AuctionType> auctionTypes = auctionTypeService.findAll();

        return new ResponseEntity<List<AuctionType>>(auctionTypes, HttpStatus.OK);
    }
}
