package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Enums.TradeRequestStatus;
import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TradeRequestRepository extends JpaRepository<TradeRequest, Integer> {

    List<TradeRequest> findByStatus(TradeRequestStatus status);

    Page<TradeRequest> findBySellerNameOrderByTimeStampDesc(String sellerName, Pageable pageable);

    Page<TradeRequest> findByBuyerNameOrderByTimeStampDesc(String buyerName, Pageable pageable);

    Optional<TradeRequest> findByBuyerItemIdAndSellerItemId(Integer buyerItemId, Integer sellerItemId);

    @Query("SELECT COUNT(tr) FROM TradeRequest tr WHERE tr.sellerItemId = :sellerItemId")
    Long countTradesBySellerItemId(@Param("sellerItemId") Integer sellerItemId);
}
