package com.fyp.auction_app.models.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class BidDTO {

    private Integer bidId;
    private String bidderName;
    private Double bidAmount;
    private Date bidTimestamp;
    private Boolean isActive;
    private ItemDTO item;
}
