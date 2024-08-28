package com.fyp.auction_app.controllers;

import com.fyp.auction_app.models.ItemCategory;
import com.fyp.auction_app.services.ItemCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class ServletItemCategoryController {

    @Autowired
    private ItemCategoryService itemCategoryService;

    @GetMapping("/category")
    public ModelAndView categoryPage() {

        List<ItemCategory> categories = itemCategoryService.getAllCategories();

        ModelAndView mav = new ModelAndView("categoryPage");
        mav.addObject("categories", categories);

        return mav;
    }

    @PostMapping("/category/delete")
    public String deleteCategory(@RequestParam("id") int id) {
        itemCategoryService.deleteCategory(id);
        return "redirect:/category";
    }

    @PostMapping("/category/create")
    public String createCategory(@RequestParam("catName") String catName) {

        ItemCategory category = new ItemCategory();
        category.setCatName(catName);

        itemCategoryService.addCategory(category);

        return "redirect:/category";
    }
}
