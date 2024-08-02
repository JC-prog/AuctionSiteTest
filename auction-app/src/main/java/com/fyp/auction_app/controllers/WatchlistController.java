package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Requests.AddWatchlistRequest;
import com.fyp.auction_app.models.Requests.RemoveWatchlistRequest;
import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/")
    public ResponseEntity<List<Watchlist>> getWatchlist()
    {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addWatchlist(@RequestBody AddWatchlistRequest watchlistRequest)
    {
        Watchlist newWatchlist;

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/remove")
    public ResponseEntity<Watchlist> removeWatchlist(@RequestBody RemoveWatchlistRequest watchlistRequest)
    {

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
