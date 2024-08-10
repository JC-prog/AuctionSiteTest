package com.fyp.auction_app.services;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.UserPreference;
import com.fyp.auction_app.repository.UserPreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserPreferenceService {
    
     @Autowired
    UserPreferenceRepository userPreferenceRepository;
     
     // Get ONE User Preference By username
     public Optional<UserPreference> findUserPreference(String username)
     {
         return userPreferenceRepository.findByUsername(username);

     }

     public Optional<UserPreference> findUserPreferenceByUsernameAndCategory(String username, String category)
     {
         return userPreferenceRepository.findByUsernameAndCategory(username, category);
     }

     // Create New User Preference
    public void createUserPreference(UserPreference userPreference)
    {
        userPreferenceRepository.save(userPreference);
    }

    // Update User Preference
    public void updateUserPreference(UserPreference userPreference)
    {
        userPreferenceRepository.save(userPreference);
    }

    // Get User Preference
    public String findUserPreferenceCategory(String username)
    {
        List<UserPreference> userPreferenceList = userPreferenceRepository.findByUsernameOrderByPreferenceScoreDesc(username);

        return userPreferenceList.getFirst().getCategory();
    }
    
}
