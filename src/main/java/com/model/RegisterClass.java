package com.model;
import java.io.Serializable;

public class RegisterClass implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String uId;
	private String uName;
	private String uMail;
	private String uPass;
	private String uNum;
	private String uAddress;
	private Boolean isAdmin;
	private Boolean isActive;

	
	public String getuId() {
		return uId;
	}
	public void setuId(String uId) {
		this.uId = uId;
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
	public Boolean getisAdmin() {
		return isAdmin;
	}
	public void setisAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	public Boolean getisActive() {
		return isActive;
	}
	public void setisActive(Boolean isActive) {
		this.isActive = isActive;
	}
	


	
	@Override
	public String toString() {
		return "RegisterClass [uId=" + uId + ", uName=" + uName + ", uMail=" + uMail + ", uPass=" + uPass + "]";
	}
	

}
