package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import org.springframework.http.HttpStatus;
import com.fyp.auction_app.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/item/create")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(createdItem, HttpStatus.OK);
    }

    @GetMapping("/item/{itemID}")
    public Optional<Item> getItemById(@PathVariable Integer itemID) {
        return itemService.findItemById(itemID);
    }

    @PutMapping("/item/{itemID}")
    public ResponseEntity<Item> updateUser(@PathVariable Integer itemID, @RequestBody Item item) {
        Optional<Item> existingUser = itemService.findItemById(itemID);

        if (existingUser.isPresent()) {
            item.setItemID(itemID);
            itemService.updateItem(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/item/{itemID}")
    public ResponseEntity<Void> deleteUser(@PathVariable("itemID") Integer itemID) {
        itemService.deleteById(itemID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
