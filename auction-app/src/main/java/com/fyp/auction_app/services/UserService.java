package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.repository.UserRepository;
import com.fyp.auction_app.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Return User
    public Optional<User> findUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Return User by Username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Return A list of Users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Returns Paginated Users
    public Page<User> findUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    // Create User
    public void createUser(User user) {

        userRepository.save(user);
    }

    // Update User
    public void updateUser(User user) {
        userRepository.save(user);
    }

    // Delete User by Id
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    // Find User Profile Photo
    public byte[] getProfilePhoto(String username) {

        Optional<User> user = findUserByUsername(username);

        if (user.isPresent())
        {
            return user.get().getProfilePhoto();
        }

        return null;
    }

    // Save User Profile Photo
    public void saveImage(String username, MultipartFile file) throws IOException {

        byte[] compressedImage = ImageUtils.compressImage(file.getBytes(), "jpeg", 0.75f);

        Optional<User> user = userRepository.findByUsername(username);

        if(user.isPresent())
        {
            User userToUpdate = user.get();
            userToUpdate.setProfilePhoto(compressedImage);

            userRepository.save(userToUpdate);
        }
    }

    // Find User Banner Image
    public byte[] findBannerImage(String username) {

        Optional<User> user = findUserByUsername(username);

        if (user.isPresent())
        {
            return user.get().getBannerImage();
        }

        return null;
    }

    // Save User Banner Image
    public void saveBanner(String username, MultipartFile file) throws IOException {

        byte[] compressedImage = ImageUtils.compressImage(file.getBytes(), "jpeg", 0.75f);

        Optional<User> user = userRepository.findByUsername(username);

        if(user.isPresent())
        {
            User userToUpdate = user.get();
            userToUpdate.setBannerImage(compressedImage);

            userRepository.save(userToUpdate);
        }
    }

    // JSP Admin Function
    public User servletFindById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void servletUpdateUserStatus(Integer id, UserStatus status) {
        User user = servletFindById(id);
        user.setStatus(status);
        userRepository.save(user);
    }
}
