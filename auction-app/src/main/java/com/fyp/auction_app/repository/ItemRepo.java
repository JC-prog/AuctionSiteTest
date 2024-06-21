package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item, Integer>, JpaSpecificationExecutor {

    List<Item> findBySellerName(String sellerName);
}
