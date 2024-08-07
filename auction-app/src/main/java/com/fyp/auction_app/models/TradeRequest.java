package com.fyp.auction_app.models;

import com.fyp.auction_app.models.Enums.TradeRequestStatus;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "trade_request")
public class TradeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer  id;

    private String buyerName;

    private Integer buyerItemId;

    private Integer sellerId;

    private Integer sellerItemId;

    @Enumerated(EnumType.STRING)
    private TradeRequestStatus status;

    private Date timeStamp;

    private Boolean is_active;

}