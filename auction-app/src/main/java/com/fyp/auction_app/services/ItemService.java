package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepo itemRepo;

    public Optional<Item> getItemById(Integer id) {
        return itemRepo.findById(id);
    }

}
