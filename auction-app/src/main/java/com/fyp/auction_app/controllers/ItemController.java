package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import org.springframework.data.domain.Page;
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

    @GetMapping("api/items")
    public ResponseEntity<Page<Item>> getItems(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findItems(page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("api/items/search")
    public ResponseEntity<Page<Item>> searchItems(
        @RequestParam(value = "keyword") String keyword,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.searchItems(keyword, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("api/item/create")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(createdItem, HttpStatus.OK);
    }

    @GetMapping("api/item/{itemID}")
    public Optional<Item> getItemById(@PathVariable Integer itemID) {
        return itemService.findItemById(itemID);
    }

    @PutMapping("api/item/{itemID}")
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

    @DeleteMapping("api/item/{itemID}")
    public ResponseEntity<Void> deleteUser(@PathVariable("itemID") Integer itemID) {
        itemService.deleteById(itemID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
