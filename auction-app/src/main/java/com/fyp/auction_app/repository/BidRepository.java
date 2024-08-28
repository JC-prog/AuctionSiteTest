package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Integer> {

    List<Bid> findByBidderName(String bidderName);

    Optional<Bid> findByBidderNameAndItemId(String bidderName, Integer itemId);

    @Query("SELECT b FROM Bid b WHERE b.itemId = :itemId ORDER BY b.bidTimestamp DESC LIMIT 1")
    Optional<Bid> findLastBidByItemId(@Param("itemId") Integer itemId);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.itemId = :itemId")
    Long countBidsByItemId(@Param("itemId") Integer itemId);

    @Query("SELECT b FROM Bid b WHERE b.bidId IN (" +
            "SELECT MAX(bid.bidId) FROM Bid bid WHERE bid.itemId IN :itemIds GROUP BY bid.itemId)")
    List<Bid> findLatestBidsByItemIds(@Param("itemIds") List<Integer> itemIds);

    @Query("SELECT b FROM Bid b WHERE b.bidId IN (" +
            "SELECT MAX(bid.bidId) FROM Bid bid WHERE bid.bidderName = :username GROUP BY bid.itemId)")
    List<Bid> findLatestBidsByUsername(@Param("username") String username);

}
