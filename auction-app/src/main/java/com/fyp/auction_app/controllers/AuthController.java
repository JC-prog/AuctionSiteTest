package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.LoginRequest;
import com.fyp.auction_app.models.RegisterRequest;
import com.fyp.auction_app.repository.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/v1/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {


        return null;
    }

    @PostMapping("/api/v1/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {

        if (userRepository.existsByUsername(registerRequest.getUName())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        return null;
    }

}
