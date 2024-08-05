package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.DTO.BidDTO;
import com.fyp.auction_app.models.Feedback;
import com.fyp.auction_app.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/all")
    public ResponseEntity<Page<Feedback>> getFeedbacks(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<Feedback> feedbacks = feedbackService.findFeedback(page, size);

        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }
}
