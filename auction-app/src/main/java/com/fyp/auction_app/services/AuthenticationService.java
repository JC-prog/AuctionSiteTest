package com.fyp.auction_app.services;

import com.fyp.auction_app.config.JwtService;
import com.fyp.auction_app.models.Enums.AccountType;
import com.fyp.auction_app.models.Enums.Role;
import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.Requests.ChangeUserPasswordRequest;
import com.fyp.auction_app.models.Requests.ResetPasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.fyp.auction_app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fyp.auction_app.models.Requests.RegisterRequest;
import com.fyp.auction_app.models.Requests.AuthenticationRequest;
import com.fyp.auction_app.models.Response.AuthenticationResponse;
import com.fyp.auction_app.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse registerUser(RegisterRequest request) {

        Optional<User> existingUser = repository.findByUsername(request.getUsername());

        if (existingUser.isPresent())
        {
            return AuthenticationResponse.builder()
                    .errorMessage("User is already registered")
                    .build();
        }

        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .interestChecked(false)
            .role(Role.USER)
            .accountType(AccountType.STANDARD)
            .status(UserStatus.ACTIVE)
            .createdAt(new Date())
            .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse registerAdmin(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .interestChecked(true)
                .role(Role.ADMIN)
                .accountType(AccountType.ADMIN)
                .status(UserStatus.ACTIVE)
                .createdAt(new Date())
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            )
        );

        User user = repository.findByUsername(request.getUsername())
                .orElseThrow();

        if(user.getStatus() == UserStatus.DEACTIVATED || user.getStatus() == UserStatus.SUSPENDED)
        {
            return AuthenticationResponse.builder()
                    .errorMessage("Account " + user.getStatus())
                    .build();
        } else {
            var jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .build();
        }
    }

    public String changePassword(@RequestBody ChangeUserPasswordRequest request) {
        User user = repository.findByUsername(request.getUsername())
                .orElseThrow();

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        repository.save(user);

        return "Success";
    }

    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = repository.findByUsername(request.getUsername())
                .orElseThrow();

        String resetPassword = request.getUsername() + "resetpassword";

        user.setPassword(passwordEncoder.encode(resetPassword));

        repository.save(user);

        return "Password Reset Successful";
    }
}
