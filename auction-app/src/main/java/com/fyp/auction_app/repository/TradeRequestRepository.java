package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.TradeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRequestRepository extends JpaRepository<TradeRequest, Integer> {

}
