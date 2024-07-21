package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid createBid(Bid bid) {

        return bidRepository.save(bid);
    }
}
