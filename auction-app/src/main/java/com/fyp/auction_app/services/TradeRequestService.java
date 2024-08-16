package com.fyp.auction_app.services;

import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.TradeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TradeRequestService {

    @Autowired
    TradeRequestRepository tradeRequestRepository;

    // Return Trade Request By Id
    public Optional<TradeRequest> findTradeRequestById(Integer id) {
        return tradeRequestRepository.findById(id);
    }

    // Return Trade Request By Buyer Item and Seller Item
    public Optional<TradeRequest> findTradeRequestByBuyerAndSellerItem(Integer buyerItemId, Integer sellerItemId)
    {
        return tradeRequestRepository.findByBuyerItemIdAndSellerItemId(buyerItemId, sellerItemId);
    }

    public Page<TradeRequest> getTradeRequestBySellerName(String buyerName, Pageable pageable) {
        return tradeRequestRepository.findBySellerNameOrderByTimeStampDesc(buyerName, pageable);
    }

    public Page<TradeRequest> getTradeRequestByBuyerName(String sellerName, Pageable pageable) {
        return tradeRequestRepository.findByBuyerNameOrderByTimeStampDesc(sellerName, pageable);
    }

    public void createTradeRequest(TradeRequest tradeRequest)
    {
        tradeRequestRepository.save(tradeRequest);
    }

    public void updateTradeRequest(TradeRequest tradeRequest)
    {
        tradeRequestRepository.save(tradeRequest);
    }

    public Long getTradeCountBySellerItemId(Integer itemId)
    {
        return tradeRequestRepository.countTradesBySellerItemId(itemId);
    }

}
