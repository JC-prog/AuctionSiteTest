package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "watchlist")
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer watchlist_id;

    private Integer buyer_id;

    private Integer item_id;

    private Date watchlist_timestamp;

    private Boolean is_active;

    // Default Constructor
    public Watchlist() {

    }

    // Constructor
    public Watchlist(
            Integer buyer_id,
            Integer item_id,
            Date watchlist_timestamp,
            Boolean is_active
    ) {
      this.buyer_id = buyer_id;
      this.item_id = item_id;
      this.watchlist_timestamp = watchlist_timestamp;
      this.is_active = is_active;
    }

    // Getter and Setter
    public Integer getWatchlistId() {
        return watchlist_id;
    }

    public void setWatchlistId(Integer watchlist_id) {
        this.watchlist_id = watchlist_id;
    }

    public Integer getBuyerId() {
        return buyer_id;
    }

    public void setBuyerId(Integer buyer_id) {
        this.buyer_id = buyer_id;
    }

    public Integer getItemId() {
        return item_id;
    }

    public void setItemId(Integer item_id) {
        this.item_id = item_id;
    }

    public Date getWatchlistTimestamp() {
        return watchlist_timestamp;
    }

    public void setWatchlistTimestamp(Date watchlist_timestamp) {
        this.watchlist_timestamp = watchlist_timestamp;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }
}
