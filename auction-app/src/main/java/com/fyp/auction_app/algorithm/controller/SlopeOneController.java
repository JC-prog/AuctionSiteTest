package com.fyp.auction_app.algorithm.controller;

import com.fyp.auction_app.algorithm.services.SlopeOneService;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/predict")
public class SlopeOneController {

    @Autowired
    private SlopeOneService slopeOneService;

    @Autowired
    private ItemRepo itemRepo;

    @GetMapping("/{username}")
    public List<Item> getRecommendations(@PathVariable String username) {
        Map<Integer, Double> predictions = slopeOneService.predictWatchlist(username);
        List<Integer> recommendedItemIds = new ArrayList<>(predictions.keySet());

        return itemRepo.findAllById(recommendedItemIds);
    }

}
