package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.ItemCategory;
import com.fyp.auction_app.services.ItemCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/category")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryService itemCategoryService;

    @GetMapping("/all")
    public ResponseEntity<List<ItemCategory>> getItemCategories()
    {
        List<ItemCategory> categories = itemCategoryService.getAllCategories();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
