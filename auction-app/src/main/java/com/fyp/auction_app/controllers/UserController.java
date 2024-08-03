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

    @GetMapping("/all")
    public ResponseEntity<Page<User>> getItems(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<User> users = userService.findUsers(page, size);

        return new ResponseEntity<>(users, HttpStatus.OK);
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

    @GetMapping("/get-role/{username}")
    public ResponseEntity<String> getUserRole(@PathVariable("username") String username) {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get().getRole().toString(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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

    @DeleteMapping("api/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer userID) {
        userService.deleteById(userID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
