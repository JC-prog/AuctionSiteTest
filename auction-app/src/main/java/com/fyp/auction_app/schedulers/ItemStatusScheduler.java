package com.fyp.auction_app.schedulers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ItemStatusScheduler {

    @Autowired
    private ItemRepo itemRepository;

    @Scheduled(fixedRate = 60000)  // 60000 milliseconds = 1 minute
    public void updateItemStatus() {
        List<Item> listedItems = itemRepository.findByStatus(ListingStatus.LISTED);
        Date now = new Date();

        for (Item item : listedItems) {
            if (item.getEndDate().before(now) && item.getStatus() != ListingStatus.EXPIRED) {

                if(item.getCurrentPrice() > item.getStartPrice())
                {
                    item.setStatus(ListingStatus.SOLD);
                } else {
                    item.setStatus(ListingStatus.EXPIRED);
                }

                itemRepository.save(item);
            }
        }
    }
}
