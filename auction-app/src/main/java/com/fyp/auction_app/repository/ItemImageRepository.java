package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.ItemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemImageRepository extends JpaRepository<ItemImage, Integer> {

}
