package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/bid")
public class BidController {

    @PostMapping("/")
    public ResponseEntity<Item> createItem() {


        return new ResponseEntity<>(HttpStatus.OK);
    }

}
