package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import org.springframework.http.HttpStatus;
import com.fyp.auction_app.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/{id}")
    public Optional<Item> getUserById(@PathVariable Integer id) {
        return itemService.getItemById(id);
    }

}
