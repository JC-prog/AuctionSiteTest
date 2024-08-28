package com.model;

public class SellerTransaction extends Transaction{
    private String SellerName;
    private String SellerAddress;
    private String SellerEmail;
    private String SellerPhone;
    
    
	public String getSellerName() {
		return SellerName;
	}
	public void setSellerName(String SellerName) {
		this.SellerName = SellerName;
	}
	public String getSellerEmail() {
		return SellerEmail;
	}
	public void setSellerEmail(String SellerEmail) {
		this.SellerEmail = SellerEmail;
	}
	public String getSellerAddress() {
		return SellerAddress;
	}
	public void setSellerAddress(String SellerAddress) {
		this.SellerAddress = SellerAddress;
	}
	public String getSellerPhone() {
		return SellerPhone;
	}
	public void setSellerPhone(String SellerPhone) {
		this.SellerPhone = SellerPhone;
	}
}
