package com.fyp.auction_app.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "trade_request")
public class TradeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  trade_id;

    private Integer buyer_id;

    private Integer buyer_item_id;

    private Integer seller_id;

    private Integer seller_item_id;

    private String status;

    private Date trade_request_timestamp;

    private Boolean is_active;

    // Default Constructor
    public TradeRequest() {

    }

    // Constructor
    public TradeRequest(
            Integer buyer_id,
            Integer buyer_item_id,
            Integer seller_id,
            Integer seller_item_id,
            String status,
            Date trade_request_timestamp,
            Boolean is_active
    ) {
        this.buyer_id = buyer_id;
        this.buyer_item_id = buyer_item_id;
        this.seller_id = seller_id;
        this.seller_item_id = seller_item_id;
        this.status = status;
        this.trade_request_timestamp = trade_request_timestamp;
        this.is_active = is_active;
    }

    // Getter and Setter
    public Integer getTradeRequestId() {
        return trade_id;
    }

    public void setTradeRequestId(Integer trade_id) {
        this.trade_id = trade_id;
    }

    public Integer getBuyerId() {
        return buyer_id;
    }

    public void setBuyerId(Integer buyer_id) {
        this.buyer_id = buyer_id;
    }

    public Integer getBuyerItemId() {
        return buyer_item_id;
    }

    public void setBuyerItemId(Integer buyer_item_id) {
        this.buyer_item_id = buyer_item_id;
    }

    public Integer getSellerId() {
        return seller_id;
    }

    public void setSellerId(Integer seller_id) {
        this.seller_id = seller_id;
    }

    public Integer getSellerItemId() {
        return seller_item_id;
    }

    public void setSellerItemId(Integer seller_item_id) {
        this.seller_item_id = seller_item_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getTradeTimestamp() {
        return trade_request_timestamp;
    }

    public void setTradeTimestamp(Date trade_request_timestamp) {
        this.trade_request_timestamp = trade_request_timestamp;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }
}
