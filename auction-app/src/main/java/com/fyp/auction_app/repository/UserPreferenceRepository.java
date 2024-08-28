package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Integer> {

    Optional<UserPreference> findByUsername(String username);

    Optional<UserPreference> findByUsernameAndCategory(String username, String category);

    List<UserPreference> findByUsernameOrderByPreferenceScoreDesc(String username);

}
