package com.fyp.auction_app.models.DTO;

import com.fyp.auction_app.models.Enums.ListingStatus;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ItemDTO {

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
    private ListingStatus status;
    private Boolean isActive;
}
