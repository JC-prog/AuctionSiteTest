package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.models.UserImage;
import com.fyp.auction_app.repository.UserImageRepository;
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

    @Autowired
    private UserImageRepository userImageRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Page<User> findUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public Optional<User> findUserById(Integer id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(User user) {

        return userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    public void saveImage(String username, MultipartFile file) throws IOException {

        byte[] compressedImage = ImageUtils.compressImage(file.getBytes(), "jpeg", 0.75f);

        Optional<UserImage> userImage = userImageRepository.findByUsername(username);

        if(userImage.isPresent())
        {
            UserImage userImageToUpdate = userImage.get();
            userImageToUpdate.setProfilePhoto(compressedImage);

            userImageRepository.save(userImageToUpdate);
        } else {
            UserImage userImageToCreate = UserImage.builder()
                    .username(username)
                    .profilePhoto(compressedImage)
                    .build();
            userImageRepository.save(userImageToCreate);
        }
    }

    public Optional<UserImage> getImage(String username) {

        return userImageRepository.findByUsername(username);
    }
}
