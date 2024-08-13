package com.fyp.auction_app.algorithm.services;

import com.fyp.auction_app.models.Watchlist;
import com.fyp.auction_app.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        for (Watchlist entry : watchlists) {
            String username = entry.getUsername();
            Integer itemId1 = entry.getItemId();

            for (Watchlist otherEntry : watchlistRepository.findByUsername(username)) {
                Integer itemId2 = otherEntry.getItemId();

                if (itemId1.equals(itemId2)) continue;

                deviations.putIfAbsent(itemId1, new HashMap<>());
                deviations.get(itemId1).putIfAbsent(itemId2, 0.0);
                frequencies.putIfAbsent(itemId1, new HashMap<>());
                frequencies.get(itemId1).putIfAbsent(itemId2, 0);

                deviations.get(itemId1).put(itemId2, deviations.get(itemId1).get(itemId2) + 1.0);
                frequencies.get(itemId1).put(itemId2, frequencies.get(itemId1).get(itemId2) + 1);
            }
        }

        for (Integer itemId1 : deviations.keySet()) {
            for (Integer itemId2 : deviations.get(itemId1).keySet()) {
                Double oldValue = deviations.get(itemId1).get(itemId2);
                int count = frequencies.get(itemId1).get(itemId2);
                deviations.get(itemId1).put(itemId2, oldValue / count);
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

                predictions.putIfAbsent(itemId2, 0.0);
                frequencies.putIfAbsent(itemId2, 0);

                Double deviation = deviations.get(itemId1).get(itemId2);

                predictions.put(itemId2, predictions.get(itemId2) + deviation);
                frequencies.put(itemId2, frequencies.get(itemId2) + 1);
            }
        }

        for (Integer itemId : predictions.keySet()) {
            predictions.put(itemId, predictions.get(itemId) / frequencies.get(itemId));
        }

        return predictions;
    }

}
