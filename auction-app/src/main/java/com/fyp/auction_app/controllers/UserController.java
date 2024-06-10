package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("api/user/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @GetMapping("api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("api/user/{userID}")
    public ResponseEntity<User> getUser(@PathVariable("userID") Integer userID) {
        Optional<User> user = userService.findUserById(userID);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("api/user/{userID}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer userID, @RequestBody User user) {
        Optional<User> existingUser = userService.findUserById(userID);

        if (existingUser.isPresent()) {
            user.setuID(userID);
            userService.updateUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
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
