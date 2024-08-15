package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.AddWatchlistRequest;
import com.fyp.auction_app.models.Requests.RemoveWatchlistRequest;
import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.services.ItemService;
import com.fyp.auction_app.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private ItemService itemService;

    @PostMapping("/")
    public ResponseEntity<List<Watchlist>> getWatchlist()
    {

        List<Watchlist> watchlists = watchlistService.findAll();

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addWatchlist(@RequestBody AddWatchlistRequest request)
    {
        Optional<Watchlist> existingWatchlist = watchlistService.findByUsernameAndItemId(request.getUsername(), request.getItemId());

        if(existingWatchlist.isEmpty())
        {
            Watchlist newWatchlist = new Watchlist();
            newWatchlist.setUsername(request.getUsername());
            newWatchlist.setItemId(request.getItemId());
            newWatchlist.setWatchlistTimestamp(new Date());

            Optional<Item> itemFound = itemService.findItemById(request.getItemId());

            if(itemFound.isPresent())
            {
                newWatchlist.setPriceAdded(itemFound.get().getCurrentPrice());
            } else {
                newWatchlist.setPriceAdded((double) 0);
            }

            watchlistService.addItemToWatchlist(newWatchlist);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {

            Watchlist watchlistToUpdate = existingWatchlist.get();

            Optional<Item> itemFound = itemService.findItemById(request.getItemId());

            itemFound.ifPresent(item -> watchlistToUpdate.setPriceAdded(item.getCurrentPrice()));

            watchlistService.addItemToWatchlist(watchlistToUpdate);

            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeWatchlist(@RequestBody RemoveWatchlistRequest request)
    {
        Optional<Watchlist> existingWatchlist = watchlistService.findByUsernameAndItemId(request.getUsername(), request.getItemId());

        existingWatchlist.ifPresent(watchlist -> watchlistService.deleteWatchlist(watchlist));

        return new ResponseEntity<>("Removed", HttpStatus.OK);
    }

    @GetMapping("/items/{username}")
    public Page<Item> getWatchlistItems(
        @PathVariable String username,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size) {

        return watchlistService.getItemsFromWatchlist(username, page, size);
    }


}
