package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {

    Optional<Watchlist> findByUsername(String username);

}