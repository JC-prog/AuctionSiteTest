package com.model;

import java.math.BigDecimal;
import java.util.Date;

public class Item {
    private int itemNo;
    private RegisterClass seller;
    private String title;
    private ItemCategory category;
    private Condition condition;
    private String description;
    private AuctionType auctionType;
    private DurationPreset durationPreset;
    private Date startDate;
    private Date endDate;
    private BigDecimal startPrice;
    private BigDecimal minSellPrice;
    private String listingStatus;
    private boolean isActive;
    private byte[] image; // Blob image field

    // Getters and Setters

    public int getItemNo() {
        return itemNo;
    }

    public void setItemNo(int itemNo) {
        this.itemNo = itemNo;
    }

    public RegisterClass getSeller() {
        return seller;
    }

    public void setSeller(RegisterClass seller) {
        this.seller = seller;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public Condition getCondition() {
        return condition;
    }

    public void setCondition(Condition condition) {
        this.condition = condition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AuctionType getAuctionType() {
        return auctionType;
    }

    public void setAuctionType(AuctionType auctionType) {
        this.auctionType = auctionType;
    }

    public DurationPreset getDurationPreset() {
        return durationPreset;
    }

    public void setDurationPreset(DurationPreset durationPreset) {
        this.durationPreset = durationPreset;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public BigDecimal getMinSellPrice() {
        return minSellPrice;
    }

    public void setMinSellPrice(BigDecimal minSellPrice) {
        this.minSellPrice = minSellPrice;
    }

    public String getListingStatus() {
        return listingStatus;
    }

    public void setListingStatus(String listingStatus) {
        this.listingStatus = listingStatus;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
