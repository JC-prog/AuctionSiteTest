package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeRequestRepository extends JpaRepository<TradeRequest, Integer> {

    Page<TradeRequest> findBySellerNameOrderByTimeStampDesc(String sellerName, Pageable pageable);

    Page<TradeRequest> findByBuyerNameOrderByTimeStampDesc(String buyerName, Pageable pageable);


}
