package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemRepo extends JpaRepository<Item, Integer>, JpaSpecificationExecutor {

}
