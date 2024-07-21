package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item, Integer>, JpaSpecificationExecutor {

    // Find items by sellerName
    List<Item> findBySellerName(String sellerName);

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
}
