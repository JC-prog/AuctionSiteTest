package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.UserRepo;
import com.fyp.auction_app.services.UserService;
import com.fyp.auction_app.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AuthController {

    @PostMapping("api/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

       return new ResponseEntity<>("User Registered", HttpStatus.OK);
    }

    @PostMapping("api/auth/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginUser) {

        String jwtToken = "loginToken";

        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }
}
