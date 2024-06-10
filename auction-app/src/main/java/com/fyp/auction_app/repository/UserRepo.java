package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo  extends JpaRepository<User, Integer> {

}
