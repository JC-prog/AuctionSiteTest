package com.fyp.auction_app.schedulers;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.BidRepository;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class ItemStatusScheduler {

    @Autowired
    private ItemRepo itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Scheduled(fixedRate = 60000)  // 60000 milliseconds = 1 minute
    public void updateItemStatus() {
        List<Item> listedItems = itemRepository.findByStatus(ListingStatus.LISTED);
        Date now = new Date();

        for (Item item : listedItems) {
            if (item.getEndDate().before(now)) {
                Optional<Bid> lastBidOpt = bidRepository.findLastBidByItemId(item.getItemId());

                if (lastBidOpt.isPresent()) {

                    if(Objects.equals(item.getAuctionType(), "low-start-high"))
                    {
                        item.setStatus(ListingStatus.FINISHED);
                    } else
                    {
                        item.setStatus(ListingStatus.SOLD);
                    }

                    item.setBidWinner(lastBidOpt.get().getBidderName());

                } else {

                    item.setStatus(ListingStatus.EXPIRED); // Safety fallback if no bids are found

                }

                itemRepository.save(item);
            }
        }
    }
}
