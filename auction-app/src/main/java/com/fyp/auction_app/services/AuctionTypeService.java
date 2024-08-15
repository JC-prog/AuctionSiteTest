package com.fyp.auction_app.services;

import com.fyp.auction_app.models.AuctionType;
import com.fyp.auction_app.repository.AuctionTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionTypeService {

    @Autowired
    private AuctionTypeRepository userRepo;

    public List<AuctionType> findAll() {
        return userRepo.findAll();
    }

}
