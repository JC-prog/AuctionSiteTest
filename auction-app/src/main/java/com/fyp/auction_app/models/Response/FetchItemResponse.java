package com.fyp.auction_app.models.Response;

import com.fyp.auction_app.models.Enums.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FetchItemResponse {

    private Integer itemId;
    private String itemTitle;
    private String itemCategory;
    private String itemCondition;
    private String description;
    private String sellerName;
    private String auctionType;
    private Double minSellPrice;
    private Double currentPrice;
    private Double startPrice;
    private String duration;
    private String bidWinner;
    private String itemPhoto;
    private ListingStatus status;
    private Boolean isActive;
}
