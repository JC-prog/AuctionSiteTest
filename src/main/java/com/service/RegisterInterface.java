package com.service;
import java.util.ArrayList;
import com.model.RegisterClass;

public interface RegisterInterface {
void addUser(RegisterClass userID);
	
	public RegisterClass getUserByID(String userID);
	
	public ArrayList<RegisterClass> getuUser();
	
	public RegisterClass updateUser(String userID, RegisterClass registerclass);
	
	public void removeUser(String userID);

}


