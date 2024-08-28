package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Requests.LogClickstreamRequest;
import com.fyp.auction_app.models.UserPreference;
import com.fyp.auction_app.services.UserPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/user-preference")
public class UserPreferenceController {

    @Autowired
    private UserPreferenceService userPreferenceService;

    @PostMapping("/log")
    public ResponseEntity<String> logUserPreference(@RequestBody LogClickstreamRequest request)
    {

        Optional<UserPreference> existingUserPreference = userPreferenceService.findUserPreferenceByUsernameAndCategory(request.getUsername(), request.getCategory());

        if (existingUserPreference.isPresent())
        {
            UserPreference userPreferenceToUpdate = existingUserPreference.get();

            // Calculate the time difference in days (or use other units depending on your requirement)
            long timeDifferenceInMillis = new Date().getTime() - userPreferenceToUpdate.getTimestamp().getTime();
            double timeDifferenceInDays = timeDifferenceInMillis / (1000.0 * 60 * 60 * 24);

            // Set the decay constant (λ)
            double lambda = 0.5; // Adjust this value based on your requirement

            // Calculate the weight using the exponential decay formula
            double weight = Math.exp(-lambda * timeDifferenceInDays);

            // Update the preference score
            Double currentScore = userPreferenceToUpdate.getPreferenceScore();
            userPreferenceToUpdate.setPreferenceScore(currentScore + 0.5 * weight);

            // Update the timestamp to the current time
            userPreferenceToUpdate.setTimestamp(new Date());

            // Save the updated user preference
            userPreferenceService.updateUserPreference(userPreferenceToUpdate);
        } else
        {
            UserPreference userPreferenceToCreate = new UserPreference();

            userPreferenceToCreate.setUsername(request.getUsername());
            userPreferenceToCreate.setCategory(request.getCategory());
            userPreferenceToCreate.setPreferenceScore(1.0);
            userPreferenceToCreate.setTimestamp(new Date());

            userPreferenceService.createUserPreference(userPreferenceToCreate);
        }

        return new ResponseEntity<>("Successfully Logged", HttpStatus.OK);
    }

    @GetMapping("/category/{username}")
    public List<String> getRecomendationCategory(@PathVariable String username)
    {
        return userPreferenceService.findTopUserPreference(username);
    }

}
