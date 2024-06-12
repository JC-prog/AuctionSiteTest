package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepo extends JpaRepository<Watchlist, Integer> {
}
