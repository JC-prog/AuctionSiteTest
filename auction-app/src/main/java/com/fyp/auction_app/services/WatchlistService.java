package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    public List<Watchlist> findAll() {
        return watchlistRepository.findAll();
    }

     public Optional<Watchlist> findAllByBuyerName(String username) {
        return watchlistRepository.findByUsername(username);
     }

}
