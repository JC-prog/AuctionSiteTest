package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.DTO.BidDTO;
import com.fyp.auction_app.models.DTO.ItemDTO;
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

    public List<Bid> findBidsByUsername(String username) {
        List<Bid> bids = bidRepository.findByBidderName(username);
        return bids;
    }

    public Long getBidCountByItemId(Integer itemId) {
        return bidRepository.countBidsByItemId(itemId);
    }
}
