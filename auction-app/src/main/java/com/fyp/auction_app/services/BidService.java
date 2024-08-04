package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Bid;
import com.fyp.auction_app.models.DTO.BidDTO;
import com.fyp.auction_app.models.DTO.ItemDTO;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.BidRepository;
import com.fyp.auction_app.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ItemRepo itemRepo;

    public Bid createBid(Bid bid) {

        return bidRepository.save(bid);
    }

    public List<BidDTO> findBidsByUsername(String username) {
        List<Bid> bids = bidRepository.findByBidderName(username);
        return bids.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private BidDTO convertToDTO(Bid bid) {
        Item item = bid.getItem();

        ItemDTO itemDTO = ItemDTO.builder()
                .itemId(item.getItemId())
                .itemTitle(item.getItemTitle())
                .itemCategory(item.getItemCategory())
                .itemCondition(item.getItemCondition())
                .description(item.getDescription())
                .sellerName(item.getSellerName())
                .auctionType(item.getAuctionType())
                .endDate(item.getEndDate())
                .currentPrice(item.getCurrentPrice())
                .startPrice(item.getStartPrice())
                .createAt(item.getCreateAt())
                .duration(item.getDuration())
                .launchDate(item.getLaunchDate())
                .status(item.getStatus())
                .isActive(item.getIsActive())
                .build();

        return BidDTO.builder()
                .bidId(bid.getBidId())
                .bidderName(bid.getBidderName())
                .bidAmount(bid.getBidAmount())
                .bidTimestamp(bid.getBidTimestamp())
                .isActive(bid.getIsActive())
                .item(itemDTO)
                .build();
    }

    public Long getBidCountByItemId(Integer itemId) {
        return bidRepository.countBidsByItemId(itemId);
    }
}
