package com.fyp.auction_app.algorithm.controller;

import com.fyp.auction_app.algorithm.services.SlopeOneService;
import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

        // Sort the entries by the predicted rating in descending order
        List<Map.Entry<Integer, Double>> sortedPredictions = predictions.entrySet().stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
                .limit(10) // Limit to top 10
                .toList();

        // Extract the item IDs of the top 10 predictions
        List<Integer> recommendedItemIds = sortedPredictions.stream()
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Retrieve and return the top 10 recommended items
        return itemRepository.findAllByItemIdInAndStatus(recommendedItemIds, ListingStatus.LISTED);
    }
}
