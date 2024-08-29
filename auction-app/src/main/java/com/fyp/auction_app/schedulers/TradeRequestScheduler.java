package com.fyp.auction_app.schedulers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Enums.TradeRequestStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.repository.ItemRepository;
import com.fyp.auction_app.repository.TradeRequestRepository;
import com.fyp.auction_app.services.TradeRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TradeRequestScheduler {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private TradeRequestRepository tradeRequestRepository;

    @Scheduled(fixedRate = 60000)  // 60000 milliseconds = 1 minute
    public void updateTradeStatus() {

        List<TradeRequest> tradeRequestAcceptedList = tradeRequestRepository.findByStatus(TradeRequestStatus.ACCEPTED);

        for(TradeRequest tradeRequest : tradeRequestAcceptedList)
        {
            Item buyerItemToUpdate = itemRepository.findByItemId(tradeRequest.getBuyerItemId());
            buyerItemToUpdate.setStatus(ListingStatus.TRADED);
            buyerItemToUpdate.setBidWinner(tradeRequest.getSellerName());
            itemRepository.save(buyerItemToUpdate);

            Item sellerItemToUpdate = itemRepository.findByItemId(tradeRequest.getSellerItemId());
            sellerItemToUpdate.setStatus(ListingStatus.TRADED);
            sellerItemToUpdate.setBidWinner(tradeRequest.getBuyerName());
            itemRepository.save(sellerItemToUpdate);
        }
    }
}
