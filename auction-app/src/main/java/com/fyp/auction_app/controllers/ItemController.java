package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.EditItemStatusRequest;
import com.fyp.auction_app.models.Requests.LaunchListingRequest;
import com.fyp.auction_app.services.BidService;
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
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private BidService bidService;

    // Get ONE Item based on itemId
    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable Integer itemId) {
        Optional<Item> item = itemService.findItemById(itemId);

        if(item.isPresent())
        {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get Paginated All Items
    @GetMapping("/all")
    public ResponseEntity<Page<Item>> getItems(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findAllItems(page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Listed
    @GetMapping("/all-listed")
    public ResponseEntity<Page<Item>> getAllListedItems(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.LISTED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Created
    @GetMapping("/all-created")
    public ResponseEntity<Page<Item>> getAllCreatedItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.CREATED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Sold
    @GetMapping("/all-sold")
    public ResponseEntity<Page<Item>> getAllSoldItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.SOLD, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Expired
    @GetMapping("/all-expired")
    public ResponseEntity<Page<Item>> getAllExpiredItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.EXPIRED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Suspended
    @GetMapping("/all-suspended")
    public ResponseEntity<Page<Item>> getAllSuspendedItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.SUSPENDED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Finished
    @GetMapping("/all-finished")
    public ResponseEntity<Page<Item>> getAllFinishedItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.FINISHED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items that are Rejected
    @GetMapping("/all-rejected")
    public ResponseEntity<Page<Item>> getAllRejectedItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    )
    {
        Page<Item> items = itemService.findItemsByStatus(ListingStatus.REJECTED, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Items Filtered By Seller
    @GetMapping("/seller")
    public ResponseEntity<List<Item>> searchItems(
            @RequestParam(value = "sellerName") String sellerName
    ) {
        List<Item> items = itemService.findItemsBySeller(sellerName);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items Created By User
    @GetMapping("/all/{sellerName}")
    public ResponseEntity<Page<Item>> getAllUserCreatedItems(
            @PathVariable String sellerName,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.findItemsBySellerName(sellerName, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items by Seller and Status
    @GetMapping("/{status}/{sellerName}")
    public ResponseEntity<Page<Item>> getUserItemsByStatus(
            @PathVariable String sellerName,
            @PathVariable String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "itemId") String sortBy,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortDirection
    ) {
        ListingStatus listingStatus;

        try {
            listingStatus = ListingStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Page<Item> items = itemService.findItemsBySellerNameAndStatus(sellerName, listingStatus, page, size, sortBy, sortDirection);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/bySellerNameAndEndDate")
    public ResponseEntity<Page<Item>> getItemsBySellerTradeItem(
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

    @GetMapping("/search")
    public ResponseEntity<Page<Item>> searchItems(
        @RequestParam(value = "keyword") String keyword,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Item> items = itemService.searchItems(keyword, page, size);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Integer> createItem(@RequestBody Item item) {

        item.setStatus(ListingStatus.CREATED);
        item.setCurrentPrice(item.getStartPrice());
        item.setCreateAt(new Date());

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(createdItem.getItemId(), HttpStatus.OK);
    }

    @PostMapping("/suspend")
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

    @PostMapping("/activate")
    public ResponseEntity<Item> activateItem(@RequestBody EditItemStatusRequest item)
    {
        Optional<Item> existingItem = itemService.findItemByItemId(item.getItemId());

        if (existingItem.isPresent()) {
            Item itemToActivate = existingItem.get();

            itemToActivate.setStatus(ListingStatus.valueOf("CREATED"));
            itemService.updateItem(itemToActivate);

            return new ResponseEntity<>(itemToActivate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{itemID}")
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

    @PostMapping("/launch")
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

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("itemID") Integer itemID) {
        itemService.deleteById(itemID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/image/{itemId}")
    public ResponseEntity<byte[]> getItemImage(@PathVariable Integer itemId) {
        Optional<Item> item = itemService.findItemById(itemId);

        if(item.isPresent()) {
            byte[] itemPhoto = item.get().getItemPhoto();

            if (itemPhoto != null) {
                return ResponseEntity.ok()
                        .header("Content-Type", "image/jpeg")
                        .body(itemPhoto);
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/upload-image/{itemId}")
    public ResponseEntity<String> uploadPhoto(@PathVariable Integer itemId, @RequestParam("file") MultipartFile file)
    {
        try {
            itemService.saveImage(itemId, file);
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image!");
        }
    }

    @PostMapping("/accept-bid/{itemId}")
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

    @PostMapping("/reject-bid/{itemId}")
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

    @PostMapping("/stop/{itemId}")
    public ResponseEntity<String> stopListing(@PathVariable Integer itemId)
    {
        Optional<Item> itemToStop = itemService.findItemById(itemId);

        if(itemToStop.isPresent())
        {
            if(!Objects.equals(itemToStop.get().getAuctionType(), "low-start-high"))
            {
                return new ResponseEntity<>("Auction Type is not Low Start High", HttpStatus.BAD_REQUEST);
            }

            Long numberOfBids = bidService.getBidCountByItemId(itemId);

            if(numberOfBids > 0 )
            {
                return new ResponseEntity<>("Auction has ongoing bids", HttpStatus.BAD_REQUEST);
            }

            Item itemToUpdate = itemToStop.get();
            itemToUpdate.setStatus(ListingStatus.CREATED);

            itemService.updateItem(itemToUpdate);

            return new ResponseEntity<>("Listing Stopped Successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Stop Listing Failed", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/price/{itemId}")
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

    @GetMapping("/top10/{sellerName}")
    public ResponseEntity<List<Item>> getTop10ItemsBySellerName(@PathVariable String sellerName) {
        List<Item> items = itemService.getTop10ItemsBySellerName(sellerName);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get Paginated Items by Seller and Status
    @GetMapping("/{category}/exclude/{sellerName}")
    public ResponseEntity<Page<Item>> getItemsExcludingSellerAndCategory(
            @PathVariable String sellerName,
            @PathVariable String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "endDate") String sortBy,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortDirection
    ) {
        if(sellerName != null)
        {
            Page<Item> items = itemService.findItemsByNotSellerNameAndCategory(sellerName, category, page, size, sortBy, sortDirection);

            return new ResponseEntity<>(items, HttpStatus.OK);
        } else {
            Page<Item> items = itemService.findItemsByCategoryAndStatus(category, ListingStatus.LISTED, page, size, sortBy, sortDirection);

            return new ResponseEntity<>(items, HttpStatus.OK);
        }
    }

    // Get Paginated Items by Seller and Status
    @GetMapping("/category")
    public ResponseEntity<Page<Item>> getItemsByCategory(
            @RequestParam(value = "name") String category,
            @RequestParam(value = "status", defaultValue = "LISTED") ListingStatus status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "endDate") String sortBy,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortDirection
    ) {
        Page<Item> items = itemService.findItemsByCategoryAndStatus(category, status, page, size, sortBy, sortDirection);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/trade")
    public Page<Item> getTradeItemFromUser(
            @RequestParam String username,
            @RequestParam int page,
            @RequestParam int size
    ) {
        return itemService.getTradeItemsBySellerAndStatus(username, page, size);
    }

}

