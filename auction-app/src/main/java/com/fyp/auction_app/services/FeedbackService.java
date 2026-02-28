package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Feedback;
import com.fyp.auction_app.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;

    public Page<Feedback> findFeedback(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return feedbackRepository.findAll(pageable);
    }

    public void createFeedback(Feedback feedback)
    {
        feedbackRepository.save(feedback);
    }

}
