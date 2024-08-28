package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.repository.BidRepository;
import com.fyp.auction_app.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Bid createBid(Bid bid) {

        return bidRepository.save(bid);
    }

    public Optional<Bid> findBidByItemIdAndBidderName(String username, Integer itemId)
    {
        return bidRepository.findByBidderNameAndItemId(username, itemId);
    }

    public List<Bid> findBidsByUsername(String username) {
        return bidRepository.findLatestBidsByUsername(username);
    }


    public Long getBidCountByItemId(Integer itemId) {
        return bidRepository.countBidsByItemId(itemId);
    }

    public List<Bid> getLatestBids(List<Integer> itemIds) {
        return bidRepository.findLatestBidsByItemIds(itemIds);
    }
}
