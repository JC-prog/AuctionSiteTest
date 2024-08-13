package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.BidRepository;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ItemRepo itemRepo;

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
