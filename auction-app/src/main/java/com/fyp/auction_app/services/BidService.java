package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid createBid(Bid bid) {

        return bidRepository.save(bid);
    }

    public List<Bid> findBidsByUsername(String bidderName) {

        return bidRepository.findByBidderName(bidderName);
    }
}
