package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Requests.LogClickstreamRequest;
import com.fyp.auction_app.models.UserPreference;
import com.fyp.auction_app.services.UserPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

            Double currentScore = userPreferenceToUpdate.getPreferenceScore();
            userPreferenceToUpdate.setPreferenceScore(currentScore + 1);

            userPreferenceService.updateUserPreference(userPreferenceToUpdate);
        } else
        {
            UserPreference userPreferenceToCreate = new UserPreference();

            userPreferenceToCreate.setUsername(request.getUsername());
            userPreferenceToCreate.setCategory(request.getCategory());
            userPreferenceToCreate.setPreferenceScore(1.0);

            userPreferenceService.createUserPreference(userPreferenceToCreate);
        }

        return new ResponseEntity<>("Successfully Logged", HttpStatus.OK);
    }

    @GetMapping("/get-recommendation")
    public String getRecomendationCategory(@RequestBody String username)
    {
        return userPreferenceService.findUserPreferenceCategory(username);
    }

}
