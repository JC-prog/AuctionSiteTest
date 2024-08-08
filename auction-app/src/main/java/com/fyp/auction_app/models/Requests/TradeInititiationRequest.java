package com.fyp.auction_app.models.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TradeInititiationRequest {

    private Integer buyerItemId;

    private String buyerName;

    private Integer sellerItemId;
}
