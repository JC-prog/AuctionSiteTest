package com.fyp.auction_app.models;

import jakarta.persistence.*;

@Entity
@Table (name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    private String user_name;

    private String user_email;

    private String user_password;

    private String user_number;

    private String user_address;

    private Boolean is_admin;

    private Boolean is_active;

    // Default Constructor
    public User() {

    }

    // Parameterized constructor
    public User(
            Integer user_id,
            String user_name,
            String user_email,
            String user_password,
            String user_number,
            String user_address,
            Boolean is_admin,
            Boolean is_active
    ) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_number = user_number;
        this.user_address = user_address;
        this.is_admin = is_admin;
        this.is_active = is_active;
    }

    // Getters and Setter
    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUserName() {
        return user_name;
    }

    public void setUserName(String user_name) {
        this.user_name = user_name;
    }

    public String getUserEmail() {
        return user_email;
    }

    public void setUserEmail(String user_email) {
        this.user_email = user_email;
    }

    public String getUserPassword() {
        return user_password;
    }

    public void setUserPassword(String user_password) {
        this.user_password = user_password;
    }

    public String getUserNumber() {
        return user_number;
    }

    public void setUserNumber(String user_number) {
        this.user_number = user_number;
    }

    public String getUserAddress() {
        return user_address;
    }

    public void setUserAddress(String user_address) {
        this.user_address = user_address;
    }

    public Boolean getIsAdmin() {
        return is_admin;
    }

    public void setIsAdmin(Boolean is_admin) {
        this.is_admin = is_admin;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }
}
