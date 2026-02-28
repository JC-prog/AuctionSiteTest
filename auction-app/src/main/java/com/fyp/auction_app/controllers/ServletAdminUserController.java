package com.fyp.auction_app.controllers;


import com.fyp.auction_app.models.Enums.UserStatus;
import com.fyp.auction_app.models.User;
import com.fyp.auction_app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class ServletAdminUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ModelAndView usersPage() {
        List<User> users = userService.findAll();

        ModelAndView mav = new ModelAndView("userListPage");
        mav.addObject("users", users);

        return mav;

    }

    @PostMapping("/user/changeStatus")
    public ModelAndView toggleUserStatus(@RequestParam Integer id) {
        User user = userService.servletFindById(id);
        UserStatus newStatus = user.getStatus() == UserStatus.ACTIVE ? UserStatus.SUSPENDED : UserStatus.ACTIVE;
        userService.servletUpdateUserStatus(id, newStatus);

        // Redirect back to the user list page after updating the status
        return new ModelAndView("redirect:/users");
    }

}
