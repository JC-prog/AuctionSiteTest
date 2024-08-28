package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.TransactionStatus;
import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.services.TransactionService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @PostMapping("/buyer/payment/{transactionId}")
    public ResponseEntity<String> payTransaction(@PathVariable Integer transactionId)
    {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);

        if (transaction.isPresent())
        {
            Transaction transactionToUpdate = transaction.get();

            transactionToUpdate.setStatus(TransactionStatus.PAID);

            transactionService.updateTransaction(transactionToUpdate);

            return new ResponseEntity<>("Transaction Updated to PAID", HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/seller/shipped/{transactionId}")
    public ResponseEntity<String> shipTransaction(@PathVariable Integer transactionId)
    {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);

        if (transaction.isPresent())
        {
            Transaction transactionToUpdate = transaction.get();

            transactionToUpdate.setStatus(TransactionStatus.SHIPPED);

            transactionService.updateTransaction(transactionToUpdate);

            return new ResponseEntity<>("Transaction Updated to SHIPPED", HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/seller/delivered/{transactionId}")
    public ResponseEntity<String> deliverTransaction(@PathVariable Integer transactionId)
    {
        Optional<Transaction> transaction = transactionService.getTransactionById(transactionId);

        if (transaction.isPresent())
        {
            Transaction transactionToUpdate = transaction.get();

            transactionToUpdate.setStatus(TransactionStatus.DELIVERED);

            transactionService.updateTransaction(transactionToUpdate);

            return new ResponseEntity<>("Transaction Updated to DELIVERED", HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
