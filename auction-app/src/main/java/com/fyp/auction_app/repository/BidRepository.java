package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Integer> {



}
