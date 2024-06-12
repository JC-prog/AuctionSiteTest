package com.fyp.auction_app.repository;


import com.fyp.auction_app.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback, Integer> {

}
