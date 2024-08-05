package com.fyp.auction_app.models;

import com.fyp.auction_app.models.Enums.ListingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    private String itemTitle;

    private String itemCategory;

    private String itemCondition;

    private String description;

    private String sellerName;

    private String auctionType;

    private Date endDate;

    private Double currentPrice;

    private Double startPrice;

    private Date createAt;

    private String duration;

    private Date launchDate;

    private String bidWinner;

    @Enumerated(EnumType.STRING)
    private ListingStatus status;

    private Boolean isActive;

}
