package com.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Transaction {
    private int transactionID;
    private String buyerID;
    private String sellerID;
    private int itemNo;
    private BigDecimal saleAmount;
    private String status;
    private Timestamp timestamp;
    private boolean isActive;

    // Getters and setters
    public int getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }

    public String getBuyerID() {
        return buyerID;
    }

    public void setBuyerID(String buyerID) {
        this.buyerID = buyerID;
    }

    public String getSellerID() {
        return sellerID;
    }

    public void setSellerID(String sellerID) {
        this.sellerID = sellerID;
    }

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }

    public BigDecimal getSaleAmount() {
        return saleAmount;
    }

    public void setSaleAmount(BigDecimal saleAmount) {
        this.saleAmount = saleAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionID=" + transactionID +
                ", buyerID='" + buyerID + '\'' +
                ", sellerID='" + sellerID + '\'' +
                ", itemNo=" + itemNo +
                ", saleAmount=" + saleAmount +
                ", status='" + status + '\'' +
                ", timestamp=" + timestamp +
                ", isActive=" + isActive +
                '}';
    }
}
