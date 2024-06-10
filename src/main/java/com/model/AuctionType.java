package com.model;

public class AuctionType {
    private int auctionTypeID;
    private String name;
    private boolean isActive;

    // Getters and Setters

    public int getAuctionTypeID() {
        return auctionTypeID;
    }

    public void setAuctionTypeID(int auctionTypeID) {
        this.auctionTypeID = auctionTypeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
