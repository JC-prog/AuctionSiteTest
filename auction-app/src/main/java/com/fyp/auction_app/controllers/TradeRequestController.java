package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.TradeRequestStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Requests.TradeInititiationRequest;
import com.fyp.auction_app.models.TradeRequest;
import com.fyp.auction_app.models.Transaction;
import com.fyp.auction_app.services.ItemService;
import com.fyp.auction_app.services.TradeRequestService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/trade")
public class TradeRequestController {

    @Autowired
    TradeRequestService tradeRequestService;

    @Autowired
    ItemService itemService;

    // Get Buyer Trade Request
    @GetMapping("/buyer/{username}")
    public Page<TradeRequest> getTransactionsByBuyerName(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return tradeRequestService.getTradeRequestByBuyerName(username, pageable);
    }

    // Get Seller Trade Request
    @GetMapping("/seller/{username}")
    public Page<TradeRequest> getTransactionsBySellerName(
            @PathVariable String username,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return tradeRequestService.getTradeRequestBySellerName(username, pageable);
    }

    // Create Trade Request
    @PostMapping("")
    public ResponseEntity<String> createTradeRequest(@RequestBody TradeInititiationRequest request)
    {
        Optional<Item> buyerItem = itemService.findItemByItemId(request.getBuyerItemId());

        Optional<Item> sellerItem = itemService.findItemByItemId(request.getSellerItemId());

        Optional<TradeRequest> tradeRequest = tradeRequestService.findTradeRequestByBuyerAndSellerItem(request.getBuyerItemId(), request.getSellerItemId());

        if(buyerItem.isPresent() && sellerItem.isPresent())
        {
            if (Objects.equals(request.getBuyerName(), sellerItem.get().getSellerName()))
            {
                return new ResponseEntity<>("Cannot Trade own item", HttpStatus.BAD_REQUEST);
            }

            if (tradeRequest.isPresent())
            {
                return new ResponseEntity<>("Item already Traded", HttpStatus.BAD_REQUEST);
            }

            TradeRequest tradeRequestToCreate = new TradeRequest();
            tradeRequestToCreate.setBuyerItemId(request.getBuyerItemId());
            tradeRequestToCreate.setBuyerItemTitle(buyerItem.get().getItemTitle());
            tradeRequestToCreate.setBuyerName(request.getBuyerName());

            tradeRequestToCreate.setSellerItemId(request.getSellerItemId());
            tradeRequestToCreate.setSellerItemTitle(sellerItem.get().getItemTitle());
            tradeRequestToCreate.setSellerName(sellerItem.get().getSellerName());

            tradeRequestToCreate.setStatus(TradeRequestStatus.PENDING);
            tradeRequestToCreate.setTimeStamp(new Date());

            tradeRequestService.createTradeRequest(tradeRequestToCreate);

            return new ResponseEntity<>("Trade Request Created", HttpStatus.OK);
        }

        return new ResponseEntity<>("Item Not Found", HttpStatus.NOT_FOUND);
    }

    // Accept Trade Request
    @PostMapping("/accept/{tradeId}")
    public ResponseEntity<String> acceptTradeRequest(@PathVariable Integer tradeId)
    {
        Optional<TradeRequest> tradeRequest = tradeRequestService.findTradeRequestById(tradeId);

        if (tradeRequest.isPresent())
        {
            if(tradeRequest.get().getStatus() != TradeRequestStatus.PENDING)
            {
                return new ResponseEntity<>("Trade Request ", HttpStatus.BAD_REQUEST);
            }

            TradeRequest tradeRequestToUpdate = tradeRequest.get();
            tradeRequestToUpdate.setStatus(TradeRequestStatus.ACCEPTED);

            tradeRequestService.updateTradeRequest(tradeRequestToUpdate);

            List<TradeRequest> otherTradeRequests = tradeRequestService.getAllTradeRequestBySellerItemIdAndStatus(tradeRequestToUpdate.getSellerItemId(), TradeRequestStatus.PENDING);

            for(TradeRequest tr : otherTradeRequests)
            {
                if(!Objects.equals(tr.getId(), tradeId))
                {
                    tr.setStatus(TradeRequestStatus.REJECTED);

                    tradeRequestService.updateTradeRequest(tr);
                }
            }

            return new ResponseEntity<>("Trade Request Accepted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Trade Request Not Found", HttpStatus.NOT_FOUND);
    }

    // Reject Trade Request
    @PostMapping("/reject/{tradeId}")
    public ResponseEntity<String> rejectTradeRequest(@PathVariable Integer tradeId)
    {

        Optional<TradeRequest> tradeRequest = tradeRequestService.findTradeRequestById(tradeId);

        if (tradeRequest.isPresent())
        {
            TradeRequest tradeRequestToUpdate = tradeRequest.get();
            tradeRequestToUpdate.setStatus(TradeRequestStatus.REJECTED);

            tradeRequestService.updateTradeRequest(tradeRequestToUpdate);

            return new ResponseEntity<>("Trade Request Accepted", HttpStatus.OK);
        }

        return new ResponseEntity<>("Trade Request Not Found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count-trade/{sellerItemId}")
    public ResponseEntity<Long> getNumberOfTrades(@PathVariable Integer sellerItemId)
    {
        Long numberOfTrades = tradeRequestService.getTradeCountBySellerItemId(sellerItemId);

        return new ResponseEntity<>(numberOfTrades, HttpStatus.OK);
    }

}
