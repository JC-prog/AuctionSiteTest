package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    public Page<Transaction> getTransactionsBySellerName(String sellerName, Pageable pageable) {
        return transactionRepository.findBySellerNameOrderByTransactionTimestampDesc(sellerName, pageable);
    }

    public Page<Transaction> getTransactionsByBuyerName(String buyerName, Pageable pageable) {
        return transactionRepository.findByBuyerNameOrderByTransactionTimestampDesc(buyerName, pageable);
    }


}
