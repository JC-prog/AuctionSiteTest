package com.fyp.auction_app.algorithm.services;

import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SlopeOneService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    public Map<Integer, Map<Integer, Double>> computeDeviations() {
        Map<Integer, Map<Integer, Double>> deviations = new HashMap<>();
        Map<Integer, Map<Integer, Integer>> frequencies = new HashMap<>();

        List<Watchlist> watchlists = watchlistRepository.findAll();

        Map<String, List<Watchlist>> userWatchlists = new HashMap<>();
        for (Watchlist entry : watchlists) {
            userWatchlists.putIfAbsent(entry.getUsername(), new ArrayList<>());
            userWatchlists.get(entry.getUsername()).add(entry);
        }

        // Calculate co-occurrence frequencies
        for (List<Watchlist> userWatchlist : userWatchlists.values()) {
            for (int i = 0; i < userWatchlist.size(); i++) {
                Integer itemId1 = userWatchlist.get(i).getItemId();

                for (int j = 0; j < userWatchlist.size(); j++) {
                    if (i == j) continue;  // Skip the same item comparison

                    Integer itemId2 = userWatchlist.get(j).getItemId();

                    deviations.putIfAbsent(itemId1, new HashMap<>());
                    frequencies.putIfAbsent(itemId1, new HashMap<>());

                    deviations.get(itemId1).putIfAbsent(itemId2, 0.0);
                    frequencies.get(itemId1).putIfAbsent(itemId2, 0);

                    // Increment deviation and frequency for co-occurrence
                    deviations.get(itemId1).put(itemId2, deviations.get(itemId1).get(itemId2) + 1.0);
                    frequencies.get(itemId1).put(itemId2, frequencies.get(itemId1).get(itemId2) + 1);
                }
            }
        }

        // Normalize deviations by frequency count
        for (Integer itemId1 : deviations.keySet()) {
            for (Integer itemId2 : deviations.get(itemId1).keySet()) {
                Double totalDeviation = deviations.get(itemId1).get(itemId2);
                int count = frequencies.get(itemId1).get(itemId2);
                deviations.get(itemId1).put(itemId2, totalDeviation / count);
            }
        }

        return deviations;
    }

    public Map<Integer, Double> predictWatchlist(String username) {
        Map<Integer, Map<Integer, Double>> deviations = computeDeviations();
        Map<Integer, Double> predictions = new HashMap<>();
        Map<Integer, Integer> frequencies = new HashMap<>();

        List<Watchlist> userWatchlist = watchlistRepository.findByUsername(username);

        for (Watchlist entry : userWatchlist) {
            Integer itemId1 = entry.getItemId();

            for (Integer itemId2 : deviations.keySet()) {
                if (itemId1.equals(itemId2)) continue;

                // Ensure the prediction map is initialized
                predictions.putIfAbsent(itemId2, 0.0);
                frequencies.putIfAbsent(itemId2, 0);

                // Check if deviation exists to prevent NullPointerException
                Map<Integer, Double> itemDeviations = deviations.get(itemId1);
                if (itemDeviations != null) {
                    Double deviation = itemDeviations.get(itemId2);
                    if (deviation != null) {
                        predictions.put(itemId2, predictions.get(itemId2) + deviation);
                        frequencies.put(itemId2, frequencies.get(itemId2) + 1);
                    }
                }
            }
        }

        // Normalize the predictions by the frequency of co-occurrence
        for (Integer itemId : predictions.keySet()) {
            predictions.put(itemId, predictions.get(itemId) / frequencies.get(itemId));
        }

        return predictions;
    }
}
