package com.fyp.auction_app.schedulers;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Enums.TransactionStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.repository.ItemRepository;
import com.fyp.auction_app.services.NotificationService;
import com.fyp.auction_app.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class BidWinnerScheduler {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private TransactionService transactionService;

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

                    Optional<Transaction> transactionExist = transactionService.getTransactionByItemId(item.getItemId());

                    if (transactionExist.isEmpty())
                    {
                        Transaction transactionToCreate = new Transaction();
                        transactionToCreate.setItemId(item.getItemId());
                        transactionToCreate.setItemTitle(item.getItemTitle());
                        transactionToCreate.setBuyerName(bidWinner);
                        transactionToCreate.setSellerName(item.getSellerName());
                        transactionToCreate.setSaleAmount(item.getCurrentPrice());
                        transactionToCreate.setTransactionTimestamp(new Date());
                        transactionToCreate.setStatus(TransactionStatus.UNPAID);

                        transactionService.createTransaction(transactionToCreate);
                    }
                }
            }
        }
    }
}
