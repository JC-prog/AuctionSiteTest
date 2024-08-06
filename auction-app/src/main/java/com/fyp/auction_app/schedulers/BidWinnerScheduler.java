package com.fyp.auction_app.schedulers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.repository.ItemRepo;
import com.fyp.auction_app.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BidWinnerScheduler {

    @Autowired
    private ItemRepo itemRepository;

    @Autowired
    private NotificationService notificationService;

    @Scheduled(fixedRate = 60000)  // 60000 milliseconds = 1 minute
    public void notifyWinner() {

        List<Item> soldItems = itemRepository.findByStatus(ListingStatus.SOLD);

        String winningBidderMessage = "You have won the auction ";

        for (Item item : soldItems) {

            Optional<Notification> notificationOptional = notificationService.findNotificationByItemId(item.getItemId());

            if (notificationOptional.isEmpty())
            {
                String bidWinner = item.getBidWinner();

                if(bidWinner != null)
                {
                    notificationService.createNotification(bidWinner, winningBidderMessage, item.getItemId());
                }
            }

        }
    }
}
