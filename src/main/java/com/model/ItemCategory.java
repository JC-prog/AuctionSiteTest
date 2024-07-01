package com.model;

public class ItemCategory {
    private int categoryNo;
    private String catName;
    private boolean isActive;
    
    public ItemCategory() {
    }

    public ItemCategory(int categoryNo, String catName, boolean isActive) {
        this.categoryNo = categoryNo;
        this.catName = catName;
        this.isActive = isActive;
    }

    // Getters and Setters

    public int getCategoryNo() {
        return categoryNo;
    }

    public void setCategoryNo(int categoryNo) {
        this.categoryNo = categoryNo;
    }

    public String getCatName() {
        return catName;
    }

    public void setCatName(String catName) {
        this.catName = catName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
