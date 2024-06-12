package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo  extends JpaRepository<User, Integer> {

}
