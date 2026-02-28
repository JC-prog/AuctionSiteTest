package com.fyp.auction_app.models.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FetchBidsResponse {

    private Integer bidId;
    private Double bidAmount;
    private Integer ItemId;
    private String ItemTitle;
    private Date endDate;
    private String itemStatus;

}
