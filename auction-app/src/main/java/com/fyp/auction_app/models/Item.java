package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemID;

    @Column(name = "itemTitle")
    private String title;

    private Integer sellerId;
    private Integer categoryNo;

    @Column(name = "itemCondition")
    private String condition;

    @Column(name = "itemDescription")
    private String description;
    private Integer auctionType;
    private Date startDate;
    private Integer durationPreset;
    private Date endDate;
    private Double startPrice;
    private Double minSellPrice;
    private String listingStatus;
    private Boolean isActive;

    // Default constructor
    public Item() {
    }

    // Parameterized constructor
    public Item(String title, Integer sellerId, Integer categoryNo, String condition, String description, Integer auctionType, Date startDate, Integer durationPreset, Date endDate, Double startPrice, Double minSellPrice, String listingStatus, Boolean isActive) {
        this.title = title;
        this.sellerId = sellerId;
        this.categoryNo = categoryNo;
        this.condition = condition;
        this.description = description;
        this.auctionType = auctionType;
        this.startDate = startDate;
        this.durationPreset = durationPreset;
        this.endDate = endDate;
        this.startPrice = startPrice;
        this.minSellPrice = minSellPrice;
        this.listingStatus = listingStatus;
        this.isActive = isActive;
    }

    // Getters and Setters

    public Integer getItemID() {
        return itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public Integer getCategoryNo() {
        return categoryNo;
    }

    public void setCategoryNo(Integer categoryNo) {
        this.categoryNo = categoryNo;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAuctionType() {
        return auctionType;
    }

    public void setAuctionType(Integer auctionType) {
        this.auctionType = auctionType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Integer getDurationPreset() {
        return durationPreset;
    }

    public void setDurationPreset(Integer durationPreset) {
        this.durationPreset = durationPreset;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(Double startPrice) {
        this.startPrice = startPrice;
    }

    public Double getMinSellPrice() {
        return minSellPrice;
    }

    public void setMinSellPrice(Double minSellPrice) {
        this.minSellPrice = minSellPrice;
    }

    public String getListingStatus() {
        return listingStatus;
    }

    public void setListingStatus(String listingStatus) {
        this.listingStatus = listingStatus;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
