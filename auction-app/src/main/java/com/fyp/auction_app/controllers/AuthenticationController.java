package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Requests.AuthenticationRequest;
import com.fyp.auction_app.models.Response.AuthenticationResponse;
import com.fyp.auction_app.models.Requests.RegisterRequest;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.AuthenticationService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody RegisterRequest request) {

       return ResponseEntity.ok(authenticationService.registerUser(request));
    }

    @PostMapping("/register-admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody RegisterRequest request) {

        return ResponseEntity.ok(authenticationService.registerAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest request) {

        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);

        return ResponseEntity.ok(authenticationResponse);
    }
}
