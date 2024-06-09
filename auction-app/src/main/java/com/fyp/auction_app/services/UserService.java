package com.fyp.auction_app.services;

import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public Optional<User> findUserById(Integer id) {
        return userRepo.findById(id);
    }

    public User createUser(User user) {

        return userRepo.save(user);
    }

    public void updateUser(User user) {
        userRepo.save(user);
    }

    public void deleteById(Integer id) {
        userRepo.deleteById(id);
    }
}
