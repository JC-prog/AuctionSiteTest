package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.EditItemStatusRequest;
import com.fyp.auction_app.models.Requests.EditUserStatusRequest;
import com.fyp.auction_app.models.Requests.LaunchListingRequest;
import com.fyp.auction_app.models.User;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import com.fyp.auction_app.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
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


    @GetMapping("api/items/all")
    public ResponseEntity<Page<Item>> getRecentItems() {

        Page<Item> items = itemService.findItems(0, 50);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("api/items/seller")
    public ResponseEntity<List<Item>> searchItems(
            @RequestParam(value = "sellerName") String sellerName
    ) {
        List<Item> items = itemService.findItemsBySeller(sellerName);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/bySellerNameAndEndDate")
    public ResponseEntity<Page<Item>> getItemsBySellerNameAndEndDate(
            @RequestParam("sellerName") String sellerName,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findItemsBySellerNameAndEndDate(sellerName, endDate, page, size);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/sortedByDuration")
    public ResponseEntity<Page<Item>> getItemsSortedByDuration(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findItemsSortedByDuration(page, size);
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
    public ResponseEntity<String> createItem(@RequestBody Item item) {

        item.setStatus(ListingStatus.CREATED);
        item.setCurrentPrice(item.getStartPrice());

        itemService.createItem(item);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/item/suspend")
    public ResponseEntity<Item> suspendUser(@RequestBody EditItemStatusRequest item)
    {
        Optional<Item> existingItem = itemService.findItemByItemId(item.getItemId());

        if (existingItem.isPresent()) {
            Item itemToSuspend = existingItem.get();

            itemToSuspend.setStatus(ListingStatus.valueOf("SUSPENDED"));
            itemService.updateItem(itemToSuspend);

            return new ResponseEntity<>(itemToSuspend, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("api/item/activate")
    public ResponseEntity<Item> activateItem(@RequestBody EditItemStatusRequest item)
    {
        Optional<Item> existingItem = itemService.findItemByItemId(item.getItemId());

        if (existingItem.isPresent()) {
            Item itemToActivate = existingItem.get();

            itemToActivate.setStatus(ListingStatus.valueOf("ACTIVE"));
            itemService.updateItem(itemToActivate);

            return new ResponseEntity<>(itemToActivate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/item/{itemID}")
    public Optional<Item> getItemById(@PathVariable Integer itemID) {
        return itemService.findItemById(itemID);
    }

    @PutMapping("api/item/{itemID}")
    public ResponseEntity<Item> updateItem(@PathVariable Integer itemID, @RequestBody Item item) {
        Optional<Item> existingUser = itemService.findItemById(itemID);

        if (existingUser.isPresent()) {
            item.setItemId(itemID);
            itemService.updateItem(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("api/item/launch")
    public ResponseEntity<String> launchItem(@RequestBody LaunchListingRequest launchRequest) {
        Optional<Item> existingItem = itemService.findItemById(launchRequest.getItemId());

        if (existingItem.isPresent()) {
            Item itemToUpdate = existingItem.get();

            LocalDateTime launchDate = LocalDateTime.now();
            itemToUpdate.setLaunchDate(Date.from(launchDate.atZone(ZoneId.systemDefault()).toInstant()));
            itemToUpdate.setStatus(ListingStatus.LISTED);

            String[] durationParts = itemToUpdate.getDuration().split(":");
            long days = Long.parseLong(durationParts[0]);
            long hours = Long.parseLong(durationParts[1]);
            long minutes = Long.parseLong(durationParts[2]);

            LocalDateTime endDate = launchDate.plusDays(days).plusHours(hours).plusMinutes(minutes);
            itemToUpdate.setEndDate(Date.from(endDate.atZone(ZoneId.systemDefault()).toInstant()));

            itemService.updateItem(itemToUpdate);

            return new ResponseEntity<>("Item launched successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("api/item/{itemID}")
    public ResponseEntity<Void> deleteUser(@PathVariable("itemID") Integer itemID) {
        itemService.deleteById(itemID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
