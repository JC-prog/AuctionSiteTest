package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    Page<Transaction> findBySellerNameOrderByTransactionTimestampDesc(String sellerName, Pageable pageable);

    Page<Transaction> findByBuyerNameOrderByTransactionTimestampDesc(String buyerName, Pageable pageable);

}
