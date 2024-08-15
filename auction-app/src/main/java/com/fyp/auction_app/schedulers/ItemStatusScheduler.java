package com.fyp.auction_app.schedulers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.BidRepository;
import com.fyp.auction_app.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ItemStatusScheduler {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private static final Logger logger = LoggerFactory.getLogger(ItemStatusScheduler.class);

    @Scheduled(fixedRate = 60000)  // 60000 milliseconds = 1 minute
    public void updateItemStatus() {
        logger.info("Update Item Status Started");

        List<Item> listedItems = itemRepository.findByStatus(ListingStatus.LISTED);
        Date now = new Date();

        listedItems.forEach(item -> {
            if (item.getEndDate().before(now)) {
                processItemStatusUpdate(item);
            }
        });

        logger.info("Update Item Status Ended");
    }

    private void processItemStatusUpdate(Item item) {
        Optional<Bid> lastBidOpt = bidRepository.findLastBidByItemId(item.getItemId());

        if (lastBidOpt.isPresent()) {
            updateStatusBasedOnAuctionType(item);
            item.setBidWinner(lastBidOpt.get().getBidderName());
        } else {
            item.setStatus(ListingStatus.EXPIRED); // Safety fallback if no bids are found
        }

        itemRepository.save(item);
    }

    private void updateStatusBasedOnAuctionType(Item item) {
        if ("low-start-high".equals(item.getAuctionType())) {
            item.setStatus(item.getMinSellPrice() < item.getCurrentPrice() ? ListingStatus.EXPIRED : ListingStatus.FINISHED);
        } else {
            item.setStatus(ListingStatus.SOLD);
        }
    }
}
