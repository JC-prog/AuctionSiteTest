package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCategoryRepo extends JpaRepository<ItemCategory, Integer> {

}
