package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.repository.ItemRepository;
import com.fyp.auction_app.repository.ItemSpecification;
import com.fyp.auction_app.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    // Returns Paginated all Items
    public Page<Item> findAllItems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return itemRepository.findAll(pageable);
    }

    // Return List of Items by Seller Name
    public List<Item> findItemsBySeller(String sellerName) {

        return itemRepository.findBySellerName(sellerName);
    }

    // Return Paginated all Items by Seller name
    public Page<Item> findItemsBySellerName(String sellerName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return itemRepository.findBySellerName(sellerName, pageable);
    }

    // Return List of Items by Status
    public List<Item> findItemsByStatus(ListingStatus status) {

        return itemRepository.findByStatus(status);
    }

    // Return Paginated all Items by Status
    public Page<Item> findItemsByStatus(ListingStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return itemRepository.findByStatus(status, pageable);
    }

    // Return List of Items by Seller Name and Listing Status
    public List<Item> findItemsBySellerNameAndStatus(String sellerName, ListingStatus status)
    {
        return itemRepository.findBySellerNameAndStatus(sellerName, status);
    }

    // Return List of Items by Seller Name and Listing Status
    public Page<Item> findItemsBySellerNameAndStatus(String sellerName, ListingStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return itemRepository.findBySellerNameAndStatus(sellerName, status, pageable);
    }

    // Return Paginated Items By Seller Name and End Date
    public Page<Item> findItemsBySellerNameAndEndDate(String sellerName, Date endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepository.findBySellerNameAndEndDate(sellerName, endDate, pageable);
    }

    public Page<Item> findItemsSortedByDuration(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return itemRepository.findAllSortedByDuration(pageable);
    }

    public Page<Item> searchItems(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Item> spec = Specification.where(ItemSpecification.containsKeyword(keyword));

        return itemRepository.findAll(spec, pageable);
    }

    public Optional<Item> findItemById(Integer id) {
        return itemRepository.findById(id);
    }

    public Item createItem(Item item) {

        return itemRepository.save(item);
    }

    public void updateItem(Item item) {
        itemRepository.save(item);
    }

    public void deleteById(Integer id) {
        itemRepository.deleteById(id);
    }

    public Optional<Item> findItemByItemId(Integer itemId) {
        return itemRepository.findById(itemId);
    }

    // Find Item Image
    public byte[] findImage(Integer itemId) {

        Optional<Item> item = itemRepository.findById(itemId);

        if (item.isPresent())
        {
            return item.get().getItemPhoto();
        }

        return null;
    }

    // Save Item Image
    public void saveImage(Integer itemId, MultipartFile file) throws IOException {

        byte[] compressedImage = ImageUtils.compressImage(file.getBytes(), "jpeg", 0.75f);

        Optional<Item> item = itemRepository.findById(itemId);

        if(item.isPresent())
        {
            Item itemToUpdate = item.get();
            itemToUpdate.setItemPhoto(compressedImage);

            itemRepository.save(itemToUpdate);
        }
    }
}
