package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.Requests.EditUserRequest;
import com.fyp.auction_app.models.Requests.EditUserStatusRequest;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Get ONE User based on Username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get Paginated All Users
    @GetMapping("/all")
    public ResponseEntity<Page<User>> getItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<User> users = userService.findUsers(page, size);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Create User
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        User createdUser = user;
        createdUser.setInterestChecked(false);
        userService.createUser(createdUser);

        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    // Edit User
    @PostMapping("/edit")
    public ResponseEntity<String> updateUser(@RequestBody EditUserRequest user) {
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setContactNumber(user.getContactNumber());
            userToUpdate.setAddress(user.getAddress());
            userService.updateUser(userToUpdate);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get User Role
    @GetMapping("/get-role/{username}")
    public ResponseEntity<String> getUserRole(@PathVariable("username") String username) {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get().getRole().toString(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get User Interest
    @GetMapping("/interest/{username}")
    public ResponseEntity<Boolean> getUserInterest(@PathVariable String username)
    {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {

            return new ResponseEntity<>(user.get().getInterestChecked(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Mark User Interest as True
    @PostMapping("/check-interest/{username}")
    public ResponseEntity<String> checkUserInterest(@PathVariable String username)
    {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {

            User userToUpdate = user.get();

            userToUpdate.setInterestChecked(true);
            userService.updateUser(userToUpdate);

            return new ResponseEntity<>("Thank You for the response", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Activate User
    @PostMapping("/activate")
    public ResponseEntity<String> activateUser(@RequestBody EditUserStatusRequest user)
    {
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            User userToActivate = existingUser.get();

            userToActivate.setStatus(UserStatus.valueOf("ACTIVE"));
            userService.updateUser(userToActivate);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Deactivate User
    @PostMapping("/deactivate")
    public ResponseEntity<String> deactivateUser(@RequestBody EditUserStatusRequest user)
    {
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            User userToDeactivate = existingUser.get();

            userToDeactivate.setStatus(UserStatus.DEACTIVATED);

            userService.updateUser(userToDeactivate);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Suspend User
    @PostMapping("/suspend")
    public ResponseEntity<String> suspendUser(@RequestBody EditUserStatusRequest user)
    {
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            User userToSuspend = existingUser.get();

            userToSuspend.setStatus(UserStatus.valueOf("SUSPENDED"));
            userService.updateUser(userToSuspend);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Get User Profile Photo
    @GetMapping("/photo/{username}")
    public ResponseEntity<byte[]> getUserImage(@PathVariable String username) {
        byte[] profilePhoto = userService.getProfilePhoto(username);

        if (profilePhoto != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")
                    .body(profilePhoto);
        }

        return ResponseEntity.notFound().build();
    }

    // Upload User Profile Photo
    @PostMapping("/upload-photo/{username}")
    public ResponseEntity<String> uploadPhoto(@PathVariable String username, @RequestParam("file") MultipartFile file)
    {
        try {
            userService.saveImage(username, file);
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image!");
        }
    }

    // Get User Banner
    @GetMapping("/banner/{username}")
    public ResponseEntity<byte[]> getUserBanner(@PathVariable String username) {
        byte[] bannerImage = userService.findBannerImage(username);

        if (bannerImage != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "image/jpeg")
                    .body(bannerImage);
        }

        return ResponseEntity.notFound().build();
    }

    // Upload User Banner
    @PostMapping("/upload-banner/{username}")
    public ResponseEntity<String> uploadBanner(@PathVariable String username, @RequestParam("file") MultipartFile file)
    {
        try {
            userService.saveBanner(username, file);
            return ResponseEntity.ok("Banner uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload banner!");
        }
    }
}
