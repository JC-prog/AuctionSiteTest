package com.model;

import java.sql.Timestamp;

public class TradeRequest {
    private int tradeID;
    private String buyerID;
    private String sellerID;
    private int buyerItemID;
    private int sellerItemID;
    private String status;
    private Timestamp timestamp;
    private String buyerItemTitle;
    private String sellerItemTitle;

    // Getters and Setters
    public int getTradeID() {
        return tradeID;
    }

    public void setTradeID(int tradeID) {
        this.tradeID = tradeID;
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

    public int getBuyerItemID() {
        return buyerItemID;
    }

    public void setBuyerItemID(int buyerItemID) {
        this.buyerItemID = buyerItemID;
    }

    public int getSellerItemID() {
        return sellerItemID;
    }

    public void setSellerItemID(int sellerItemID) {
        this.sellerItemID = sellerItemID;
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

    public String getBuyerItemTitle() {
        return buyerItemTitle;
    }

    public void setBuyerItemTitle(String buyerItemTitle) {
        this.buyerItemTitle = buyerItemTitle;
    }

    public String getSellerItemTitle() {
        return sellerItemTitle;
    }

    public void setSellerItemTitle(String sellerItemTitle) {
        this.sellerItemTitle = sellerItemTitle;
    }
}
