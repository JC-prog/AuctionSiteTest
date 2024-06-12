package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.TradeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRequestRepo extends JpaRepository<TradeRequest, Integer> {

}
