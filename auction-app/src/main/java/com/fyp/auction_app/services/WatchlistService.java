package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.repository.ItemRepository;
import com.fyp.auction_app.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private ItemRepository itemRepository;

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

    public Page<Item> getItemsFromWatchlist(String username, int page, int size) {
        List<Watchlist> watchlist = watchlistRepository.findByUsername(username);
        List<Integer> itemIds = watchlist.stream()
                .map(Watchlist::getItemId)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);

        return itemRepository.findByItemIdIn(itemIds, pageable);
    }

}
