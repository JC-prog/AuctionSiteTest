package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.Item;
import com.fyp.auction_app.models.Notification;
import com.fyp.auction_app.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/{username}")
    public ResponseEntity<Page<Notification>> getNotification(
            @PathVariable("username") String username,
          @RequestParam(value = "page", defaultValue = "0") int page,
          @RequestParam(value = "size", defaultValue = "10") int size)
    {
        Page<Notification> notifications = notificationService.findNotificationByUsername(username, page, size);

        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

}
