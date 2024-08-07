package com.fyp.auction_app.services;

import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.repository.TradeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TradeRequestService {

    @Autowired
    TradeRequestRepository tradeRequestRepository;

    public void createTradeRequest(TradeRequest tradeRequest)
    {
        tradeRequestRepository.save(tradeRequest);
    }

}
