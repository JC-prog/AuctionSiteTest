package com.fyp.auction_app.services;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Page<Notification> findNotificationByUsername(String username, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return notificationRepository.findByUsername(username, pageable);
    }

    public Optional<Notification> findNotificationByItemId(Integer itemId)
    {
        return notificationRepository.findByItemId(itemId);
    }

    public void createNotification(String username, String message, Integer itemId)
    {
        Notification newNotification = new Notification();

        newNotification.setUsername(username);
        newNotification.setNotificationHeader("Bid Won");
        newNotification.setNotificationMessage(message);
        newNotification.setItemId(itemId);
        newNotification.setNotificationTimeStamp(new Date());

        notificationRepository.save(newNotification);
    }
}
