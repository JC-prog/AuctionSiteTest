package com.fyp.auction_app.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer uID;

    private String uName;
    private String uMail;
    private String uPass;
    private String uNum;
    private String uAddress;
    private Boolean isAdmin;
    private Boolean isActive;

    // Default Constructor
    public User() {

    }

    // Parameterized constructor
    public User(Integer uID, String uName, String uMail, String uPass, String uNum, String uAddress, Boolean isAdmin, Boolean isActive) {
        this.uID = uID;
        this.uName = uName;
        this.uMail = uMail;
        this.uPass = uPass;
        this.uNum = uNum;
        this.uAddress = uAddress;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
    }

    // Getters and Setters

    public Integer getuID() {
        return uID;
    }

    public void setuID(Integer uID) {
        this.uID = uID;
    }

    public String getuName() {
        return uName;
    }

    public void setuName(String uName) {
        this.uName = uName;
    }

    public String getuMail() {
        return uMail;
    }

    public void setuMail(String uMail) {
        this.uMail = uMail;
    }

    public String getuPass() {
        return uPass;
    }

    public void setuPass(String uPass) {
        this.uPass = uPass;
    }

    public String getuNum() {
        return uNum;
    }

    public void setuNum(String uNum) {
        this.uNum = uNum;
    }

    public String getuAddress() {
        return uAddress;
    }

    public void setuAddress(String uAddress) {
        this.uAddress = uAddress;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
