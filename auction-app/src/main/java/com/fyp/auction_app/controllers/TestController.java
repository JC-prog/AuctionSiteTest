package com.fyp.auction_app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class TestController {

    @GetMapping({"/hello"})
    public String hello() {

        return "helloWorld";
    }

}
