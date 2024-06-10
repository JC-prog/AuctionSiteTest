package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="Bid")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bid_id")
    private Integer bidID;

    @Column(name="bidder_id")
    private Integer bidderID;

    @Column(name="item_id")
    private Integer itemID;

    @Column(name="bid_amount")
    private Double bidAmount;

    @Column(name="time_stamp")
    private Date dateTime;

    @Column(name="is_Active", columnDefinition="TINYINT(1)")
    private Boolean isActive;

    // Default constructor
    public Bid() {
    }

    public Bid(Integer bidderID, Integer itemID, Double bidAmount, Date dateTime, Boolean isActive) {

        this.bidderID = bidderID;
        this.itemID = itemID;
        this.bidAmount = bidAmount;
        this.dateTime = dateTime;
        this.isActive = isActive;

    }

    public Integer getBidID() {
        return bidID;
    }

    public void setBidID(Integer bidID) {
        this.bidID = bidID;
    }

    public Integer getBidderID() {
        return bidderID;
    }

    public void setBidderID(Integer bidderID) {
        this.bidderID = bidderID;
    }

    public Integer getItemID() {
        return itemID;
    }

    public void setItemID(Integer itemID) {
        this.itemID = itemID;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

}
