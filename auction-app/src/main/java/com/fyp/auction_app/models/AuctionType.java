package com.fyp.auction_app.models;

import jakarta.persistence.*;

@Entity
@Table(name = "auction_type")
public class AuctionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer auction_type_id;

    private String auction_type_name;

    private Boolean is_active;

    // Default Constructor
    public AuctionType () {

    }

    // Constructor
    public AuctionType(String auction_type_name, Boolean is_active) {
        this.auction_type_name = auction_type_name;
        this.is_active = is_active;
    }

    // Getter and Setter
    public Integer getAuctionTypeId() {
        return auction_type_id;
    }

    public void setAuctionTypeId(Integer auction_type_id) {
        this.auction_type_id = auction_type_id;
    }

    public String getAuctionTypeName() {
        return auction_type_name;
    }

    public void setAuctionTypeName(String auction_type_name) {
        this.auction_type_name = auction_type_name;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }

}
