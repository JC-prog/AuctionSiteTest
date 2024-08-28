package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer>, JpaSpecificationExecutor {

    Item findByItemId(Integer itemId);

    // Find List of Items by sellerName
    List<Item> findBySellerName(String sellerName);

    // Find Paginated Items by SellerName
    Page<Item> findBySellerName(String sellerName, Pageable pageable);

    // Find List of Items By Status
    List<Item> findByStatus(ListingStatus status);

    // Find Paginated Items By Status
    Page<Item> findByStatus(ListingStatus status, Pageable pageable);

    // Find List of Items by Seller Name and Status
    List<Item> findBySellerNameAndStatus(String sellerName, ListingStatus status);

    // Find Paginated Items by Seller Name and Status
    Page<Item> findBySellerNameAndStatus(String sellerName, ListingStatus status, Pageable pageable);

    Item findByItemTitle(String itemTitle);

    // Custom Queries
    // Find items by sellerName and endDate
    @Query("SELECT i FROM Item i WHERE i.sellerName = :sellerName AND i.endDate = :endDate")
    Page<Item> findBySellerNameAndEndDate(
            @Param("sellerName") String sellerName,
            @Param("endDate") Date endDate,
            Pageable pageable
    );

    // Find items sorted by duration
    @Query("SELECT i FROM Item i ORDER BY i.duration DESC")
    Page<Item> findAllSortedByDuration(Pageable pageable);

    Page<Item> findByItemIdIn(List<Integer> itemIds, Pageable pageable);

    @Query("SELECT i FROM Item i WHERE i.sellerName = :sellerName AND status = 'LISTED'" +
            "ORDER BY (SELECT COUNT(b) FROM Bid b WHERE b.itemId = i.itemId) DESC")
    List<Item> findTop10ItemsBySellerNameOrderByBidCount(@Param("sellerName") String sellerName);

    Page<Item> findBySellerNameNotAndItemCategoryAndStatus(String sellerName, String category, ListingStatus status, Pageable pageable);

    Page<Item> findByItemCategoryAndStatus(String category, ListingStatus status, Pageable pageable);

    @Query("SELECT i FROM Item i WHERE i.sellerName = :sellerName AND i.status IN :statuses AND i.auctionType = :auctionType")
    Page<Item> findItemsBySellerNameAndStatusAndAuctionType(
            @Param("sellerName") String sellerName,
            @Param("statuses") List<ListingStatus> statuses,
            @Param("auctionType") String auctionType,
            Pageable pageable
    );

    List<Item> findAllByItemIdInAndStatus(List<Integer> itemIds, ListingStatus status);
}
