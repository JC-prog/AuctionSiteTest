package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.repository.ItemRepo;
import com.fyp.auction_app.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private ItemRepo itemRepo;

    public void addItemToWatchlist(Watchlist watchlist) {
        watchlistRepository.save(watchlist);
    }

    public List<Watchlist> findAll() {
        return watchlistRepository.findAll();
    }

     public Optional<Watchlist> findByUsernameAndItemId(String username, Integer itemId) {
        return watchlistRepository.findByUsernameAndItemId(username, itemId);
     }

     public void deleteWatchlist(Watchlist watchlistToDelete)
     {
         watchlistRepository.delete(watchlistToDelete);
     }

    public void updateWatchlist(Watchlist watchlist) {
        watchlistRepository.save(watchlist);
    }

    public List<Item> getItemsFromWatchlist(String username) {
        List<Watchlist> watchlist = watchlistRepository.findByUsername(username);
        List<Integer> itemIds = watchlist.stream()
                .map(Watchlist::getItemId)
                .collect(Collectors.toList());

        return itemRepo.findByItemIdIn(itemIds);
    }

}
