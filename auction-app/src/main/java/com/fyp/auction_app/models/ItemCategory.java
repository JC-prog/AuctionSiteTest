package com.fyp.auction_app.models;

import jakarta.persistence.*;

@Entity
@Table(name = "item_category")
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cat_id;

    private String cat_name;

    private Boolean is_active;

    // Default Constructor
    public ItemCategory() {

    }

    // Constructor
    public ItemCategory (String cat_name, Boolean is_active) {
        this.cat_name = cat_name;
        this.is_active = is_active;
    }

    // Getter and Setter
    public Integer getCatId() {
        return cat_id;
    }

    public void setCatId(Integer cat_id) {
        this.cat_id = cat_id;
    }

    public String getCatName() {
        return cat_name;
    }

    public void setCatName(String cat_name) {
        this.cat_name = cat_name;
    }

    public Boolean getIsActive() {
        return is_active;
    }

}
