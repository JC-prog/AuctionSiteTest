package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepo extends JpaRepository<Bid, Integer> {

}
