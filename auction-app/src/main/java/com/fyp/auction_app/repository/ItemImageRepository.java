package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.ItemImage;
import com.fyp.auction_app.models.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemImageRepository extends JpaRepository<ItemImage, Integer> {

    Optional<ItemImage> findByItemId(Integer itemId);
}
