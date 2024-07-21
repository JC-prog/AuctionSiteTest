package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.ItemRepo;
import com.fyp.auction_app.repository.ItemSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepo itemRepo;

    public Page<Item> findItems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepo.findAll(pageable);
    }

    public List<Item> findItemsBySeller(String sellerName) {

        return itemRepo.findBySellerName(sellerName);
    }

    public Page<Item> findItemsBySellerNameAndEndDate(String sellerName, Date endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepo.findBySellerNameAndEndDate(sellerName, endDate, pageable);
    }

    public Page<Item> findItemsSortedByDuration(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepo.findAllSortedByDuration(pageable);
    }

    public Page<Item> searchItems(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Item> spec = Specification.where(ItemSpecification.containsKeyword(keyword));

        return itemRepo.findAll(spec, pageable);
    }

    public Optional<Item> findItemById(Integer id) {
        return itemRepo.findById(id);
    }

    public Item createItem(Item item) {

        return itemRepo.save(item);
    }

    public void updateItem(Item item) {
        itemRepo.save(item);
    }

    public void deleteById(Integer id) {
        itemRepo.deleteById(id);
    }

}
