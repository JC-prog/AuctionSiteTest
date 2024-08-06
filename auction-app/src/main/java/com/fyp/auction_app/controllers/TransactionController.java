package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/seller/{username}")
    public Page<Transaction> getTransactionsBySellerName(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return transactionService.getTransactionsBySellerName(username, pageable);
    }

    @GetMapping("/buyer/{username}")
    public Page<Transaction> getTransactionsByBuyerName(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return transactionService.getTransactionsByBuyerName(username, pageable);
    }


}
