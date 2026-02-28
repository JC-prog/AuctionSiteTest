package com.fyp.auction_app.services;

import com.fyp.auction_app.models.ItemCategory;
import com.fyp.auction_app.repository.ItemCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCategoryService {

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    public List<ItemCategory> getAllCategories() {
        return itemCategoryRepository.findAll();
    }

    public void updateCategory(ItemCategory category) {
        itemCategoryRepository.save(category);
    }

    public void deleteCategory(int categoryId) {
        itemCategoryRepository.deleteById(categoryId);
    }

    public void addCategory(ItemCategory category) {
        itemCategoryRepository.save(category);
    }
}
