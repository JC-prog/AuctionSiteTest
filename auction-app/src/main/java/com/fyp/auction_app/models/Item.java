package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer item_id;

    private String item_title;

    private Integer seller_id;

    private Integer item_category_num;

    private String item_condition;

    private String description;

    private Integer auction_type;

    private Date start_date;

    private Integer duration_preset;

    private Date end_date;

    private Double start_price;

    private Double min_sell_price;

    private String listing_status;

    private Boolean is_active;

    // Default constructor
    public Item() {
    }

    // Parameterized constructor
    public Item(
            String item_title,
            Integer seller_id,
            Integer item_category_num,
            String item_condition,
            String description,
            Integer auction_type,
            Date start_date,
            Integer duration_preset,
            Date end_date,
            Double start_price,
            Double min_sell_price,
            String listing_status,
            Boolean is_active
    ) {
        this.item_title = item_title;
        this.seller_id = seller_id;
        this.item_category_num = item_category_num;
        this.item_condition = item_condition;
        this.description = description;
        this.auction_type = auction_type;
        this.start_date = start_date;
        this.duration_preset = duration_preset;
        this.end_date = end_date;
        this.start_price = start_price;
        this.min_sell_price = min_sell_price;
        this.listing_status = listing_status;
        this.is_active = is_active;
    }

    // Getters and Setters
    public Integer getItemId() {
        return item_id;
    }

    public void setItemID(Integer item_id) {
        this.item_id = item_id;
    }

    public String getItemTitle() {
        return item_title;
    }

    public void setTitle(String item_title) {
        this.item_title = item_title;
    }

    public Integer getSellerId() {
        return seller_id;
    }

    public void setSellerId(Integer seller_id) {
        this.seller_id = seller_id;
    }

    public Integer getItemCategoryNum() {
        return item_category_num;
    }

    public void setItemCategoryNum(Integer item_category_num) {
        this.item_category_num = item_category_num;
    }

    public String getItemCondition() {
        return item_condition;
    }

    public void setCondition(String item_condition) {
        this.item_condition = item_condition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAuctionType() {
        return auction_type;
    }

    public void setAuctionType(Integer auction_type) {
        this.auction_type = auction_type;
    }

    public Date getStartDate() {
        return start_date;
    }

    public void setStartDate(Date start_date) {
        this.start_date = start_date;
    }

    public Integer getDurationPreset() {
        return duration_preset;
    }

    public void setDurationPreset(Integer duration_preset) {
        this.duration_preset = duration_preset;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Double getStartPrice() {
        return start_price;
    }

    public void setStartPrice(Double startPrice) {
        this.start_price = startPrice;
    }

    public Double getMinSellPrice() {
        return min_sell_price;
    }

    public void setMinSellPrice(Double min_sell_price) {
        this.min_sell_price = min_sell_price;
    }

    public String getListingStatus() {
        return listing_status;
    }

    public void setListingStatus(String listing_status) {
        this.listing_status = listing_status;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }
}
