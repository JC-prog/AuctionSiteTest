package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Requests.EditUserRequest;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<User> updateUser(@RequestBody EditUserRequest user) {
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setContactNumber(user.getContactNumber());
            userToUpdate.setAddress(user.getAddress());
            userService.updateUser(userToUpdate);

            return new ResponseEntity<>(userToUpdate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("api/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer userID) {
        userService.deleteById(userID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
