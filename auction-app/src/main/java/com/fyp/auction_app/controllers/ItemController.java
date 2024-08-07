package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.ItemImage;
import com.fyp.auction_app.models.Requests.EditItemStatusRequest;
import com.fyp.auction_app.models.Requests.EditUserStatusRequest;
import com.fyp.auction_app.models.Requests.LaunchListingRequest;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.UserImage;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import com.fyp.auction_app.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("api/created-items/{username}")
    public ResponseEntity<Page<Item>> getUserCreatedItems(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findCreatedItems(username, page, size);

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
    public ResponseEntity<Integer> createItem(@RequestBody Item item) {

        item.setStatus(ListingStatus.CREATED);
        item.setCurrentPrice(item.getStartPrice());

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(createdItem.getItemId(), HttpStatus.OK);
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

            if(itemToUpdate.getStatus() == ListingStatus.LISTED)
            {
                return new ResponseEntity<>("Cannot Launch Listed Items", HttpStatus.BAD_REQUEST);
            }

            if(itemToUpdate.getStatus() == ListingStatus.SOLD)
            {
                return new ResponseEntity<>("Cannot Launch Sold Items", HttpStatus.BAD_REQUEST);
            }

            if(itemToUpdate.getStatus() == ListingStatus.SUSPENDED)
            {
                return new ResponseEntity<>("Cannot Launch Suspended Items", HttpStatus.BAD_REQUEST);
            }

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

    @DeleteMapping("api/item/{itemId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("itemID") Integer itemID) {
        itemService.deleteById(itemID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/api/item/image/{itemId}")
    public ResponseEntity<byte[]> getItemImage(@PathVariable Integer itemId) {
        Optional<ItemImage> itemImage = itemService.getImage(itemId);

        if(itemImage.isPresent()) {
            byte[] itemPhoto = itemImage.get().getItemPhoto();

            if (itemPhoto != null) {
                return ResponseEntity.ok()
                        .header("Content-Type", "image/jpeg")
                        .body(itemPhoto);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/api/item/upload-image/{itemId}")
    public ResponseEntity<String> uploadPhoto(@PathVariable Integer itemId, @RequestParam("file") MultipartFile file)
    {
        try {
            itemService.saveImage(itemId, file);
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image!");
        }
    }

    @PostMapping("/api/item/accept-bid/{itemId}")
    public ResponseEntity<String> acceptBid(@PathVariable Integer itemId)
    {
        Optional<Item> itemToAccept = itemService.findItemById(itemId);

        if(itemToAccept.isPresent() && itemToAccept.get().getStatus() == ListingStatus.FINISHED)
        {
            Item itemBidAccepted = itemToAccept.get();
            itemBidAccepted.setStatus(ListingStatus.SOLD);

            itemService.updateItem(itemBidAccepted);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/item/reject-bid/{itemId}")
    public ResponseEntity<String> rejectBid(@PathVariable Integer itemId)
    {
        Optional<Item> itemToReject = itemService.findItemById(itemId);

        if(itemToReject.isPresent() && itemToReject.get().getStatus() == ListingStatus.FINISHED)
        {
            Item itemBidRejected= itemToReject.get();
            itemBidRejected.setStatus(ListingStatus.REJECTED);

            itemService.updateItem(itemBidRejected);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/item/price/{itemId}")
    public ResponseEntity<Double> getItemPrice(@PathVariable Integer itemId)
    {
        Optional<Item> itemToGet = itemService.findItemById(itemId);

        if(itemToGet.isPresent())
        {
            Item itemBidRejected= itemToGet.get();

            return new ResponseEntity<>(itemToGet.get().getCurrentPrice(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
