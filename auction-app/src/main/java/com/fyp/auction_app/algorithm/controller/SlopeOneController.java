package com.fyp.auction_app.algorithm.controller;

import com.fyp.auction_app.algorithm.services.SlopeOneService;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/predict")
public class SlopeOneController {

    @Autowired
    private SlopeOneService slopeOneService;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/{username}")
    public List<Item> getRecommendations(@PathVariable String username) {
        Map<Integer, Double> predictions = slopeOneService.predictWatchlist(username);
        List<Integer> recommendedItemIds = new ArrayList<>(predictions.keySet());

        return itemRepository.findAllById(recommendedItemIds);
    }

}
