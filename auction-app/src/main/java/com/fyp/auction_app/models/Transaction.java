package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transaction_id;

    private Integer buyer_id;

    private Integer seller_id;

    private Double sale_amount;

    private String status;

    private Date transaction_timestamp;

    private Boolean is_active;

    // Default Constructor
    public Transaction() {

    }

    // Constructor
    public Transaction(
            Integer buyer_id,
            Integer seller_id,
            Double sale_amount,
            String status,
            Date transaction_timestamp,
            Boolean is_active
    ) {
        this.buyer_id = buyer_id;
        this.seller_id = seller_id;
        this.sale_amount = sale_amount;
        this.status = status;
        this.transaction_timestamp = transaction_timestamp;
        this.is_active = is_active;
    }

    // Getter and Setter
    public Integer getTransactionId() {
        return transaction_id;
    }

    public void setTransactionId(Integer transaction_id) {
        this.transaction_id = transaction_id;
    }

    public Integer getBuyerId() {
        return buyer_id;
    }

    public void setBuyerId(Integer buyer_id) {
        this.buyer_id = buyer_id;
    }

    public Integer getSellerId() {
        return seller_id;
    }

    public void setSellerId(Integer seller_id) {
        this.seller_id = seller_id;
    }

    public Double getSaleAmount() {
        return sale_amount;
    }

    public void setSaleAmount(Double sale_amount) {
        this.sale_amount = sale_amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getTransactionTimestamp() {
        return transaction_timestamp;
    }

    public void setTransaction_timestamp(Date transaction_timestamp) {
        this.transaction_timestamp = transaction_timestamp;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }
}
