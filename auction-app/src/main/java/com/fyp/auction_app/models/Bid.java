package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bid")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bid_id;

    private Integer bidder_id;

    private Integer item_id;

    private Double bid_amount;

    private Date bid_timestamp;

    private Boolean is_active;

    // Default constructor
    public Bid() {
    }

    public Bid(
            Integer bidder_id,
            Integer item_id,
            Double bid_amount,
            Date bid_timestamp,
            Boolean is_active
    ) {
        this.bidder_id = bidder_id;
        this.item_id = item_id;
        this.bid_amount = bid_amount;
        this.bid_timestamp = bid_timestamp;
        this.is_active = is_active;

    }

    public Integer getBidId() {
        return bid_id;
    }

    public void setBidID(Integer bid_id) {
        this.bid_id = bid_id;
    }

    public Integer getBidderId() {
        return bidder_id;
    }

    public void setBidderId(Integer bidder_id) {
        this.bidder_id = bidder_id;
    }

    public Integer getItemId() {
        return item_id;
    }

    public void setItemId(Integer item_id) {
        this.item_id = item_id;
    }

    public Double getBidAmount() {
        return bid_amount;
    }

    public void setBidAmount(Double bid_amount) {
        this.bid_amount = bid_amount;
    }

    public Date getBidTimestamp() {
        return bid_timestamp;
    }

    public void setBidTimestamp(Date bid_timestamp) {
        this.bid_timestamp = bid_timestamp;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }

}
