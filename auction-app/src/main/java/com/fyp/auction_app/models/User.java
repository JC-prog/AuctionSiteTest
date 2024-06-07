package com.fyp.auction_app.models;

public class User {

    private static final long serialVersionUID = 1L;
    private String uName;
    private String uPass;
    private String uId;

    public String getuName() {
        return uName;
    }
    public void setuName(String uName) {
        this.uName = uName;
    }
    public String getuPass() {
        return uPass;
    }
    public void setuPass(String uPass) {
        this.uPass = uPass;
    }
    public String getuId() {
        return uId;
    }
    public void setuId(String uId) {
        this.uId = uId;
    }

    @Override
    public String toString() {
        return "LoginBean [uName=" + uName + ", uPass=" + uPass + "]";
    }

}
