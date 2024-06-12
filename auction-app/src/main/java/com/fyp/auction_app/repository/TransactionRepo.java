package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

}
