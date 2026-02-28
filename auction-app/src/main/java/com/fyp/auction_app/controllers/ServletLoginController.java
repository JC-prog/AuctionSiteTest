package com.fyp.auction_app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Objects;

@Controller
public class ServletLoginController {

    @GetMapping("/login")
    public ModelAndView loginPage()
    {

        return new ModelAndView("login");
    }

    @PostMapping("/login")
    public ModelAndView handleLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password)
    {

        ModelAndView modelAndView = new ModelAndView();

        if(Objects.equals(username, "admin") && Objects.equals(password, "admin"))
        {
            modelAndView.setViewName("home");
        } else {
            modelAndView.setViewName("login");
        }

        return modelAndView;
    }
}
