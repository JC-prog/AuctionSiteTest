package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    Optional<Transaction> findByItemId(Integer itemId);

    Page<Transaction> findBySellerNameOrderByTransactionTimestampDesc(String sellerName, Pageable pageable);

    Page<Transaction> findByBuyerNameOrderByTransactionTimestampDesc(String buyerName, Pageable pageable);

}
