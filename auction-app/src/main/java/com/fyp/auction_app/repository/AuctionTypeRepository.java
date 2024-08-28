package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.AuctionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionTypeRepository extends JpaRepository<AuctionType, Integer> {
}
