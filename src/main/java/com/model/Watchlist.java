package com.model;

import java.util.Date;

public class Watchlist {
    private int watchlistID;
    private String buyerID;
    private int itemNo;
    private Date timestamp;
    private boolean isActive;

    // Getters and Setters
    public int getWatchlistID() {
        return watchlistID;
    }

    public void setWatchlistID(int watchlistID) {
        this.watchlistID = watchlistID;
    }

    public String getBuyerID() {
        return buyerID;
    }

    public void setBuyerID(String buyerID) {
        this.buyerID = buyerID;
    }

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
