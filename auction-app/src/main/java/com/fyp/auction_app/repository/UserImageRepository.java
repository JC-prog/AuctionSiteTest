package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Integer> {

    Optional<UserImage> findByUsername(String username);

}