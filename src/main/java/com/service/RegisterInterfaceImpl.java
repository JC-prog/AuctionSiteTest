package com.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;
import com.model.RegisterClass;
import com.util.ProjectConstants;
import com.util.CommonUtil;
import com.util.DBConnectionUtil;
import com.util.QueryUtil;


public class RegisterInterfaceImpl implements RegisterInterface {
	
	//public static final Logger log = Logger.getLogger(ItemServiceImpl.class.getName());

	private static Connection connection;

	private static Statement statement;
	
	static{
		//create table or drop if exist
		createUserTable();
	}
	
	private PreparedStatement preparedStatement;
	
	public static void createUserTable() {

		try {
			connection = DBConnectionUtil.getDBConnection();
			statement = connection.createStatement();
			statement.executeUpdate(QueryUtil.queryByID(ProjectConstants.QUERY_ID_DROP_TABLE));

			statement.executeUpdate(QueryUtil.queryByID(ProjectConstants.QUERY_ID_CREATE_TABLE3));

		} catch (SQLException | SAXException | IOException | ParserConfigurationException | ClassNotFoundException e) {
			//log.log(Level.SEVERE, e.getMessage());
			e.printStackTrace();
		}
	}

	@Override
	public void addUser(RegisterClass registerClass) {
		
		//String userID = CommonUtil.generateIDs(getUserIDs());
		
		try {
			connection = DBConnectionUtil.getDBConnection();
			
			preparedStatement = connection.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_INSERT_USERS));
			connection.setAutoCommit(false);
			
			//registerClass.setuId(userID);
			preparedStatement.setString(ProjectConstants.COLUMN_INDEX_ONE, registerClass.getuId());
			preparedStatement.setString(ProjectConstants.COLUMN_INDEX_TWO, registerClass.getuName());
			preparedStatement.setString(ProjectConstants.COLUMN_INDEX_THREE, registerClass.getuMail());
			preparedStatement.setString(ProjectConstants.COLUMN_INDEX_FOUR, registerClass.getuPass());
			preparedStatement.setString(ProjectConstants.COLUMN_INDEX_FIVE, registerClass.getuR_Pass());
			
			preparedStatement.execute();
			connection.commit();
		}catch (SQLException | SAXException | IOException | ParserConfigurationException | ClassNotFoundException e) {
			//log.log(Level.SEVERE, e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (preparedStatement != null) {
					preparedStatement.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				//log.log(Level.SEVERE, e.getMessage());
				e.printStackTrace();
			}
		}

	}
	@Override
	public ArrayList<String> getAllUserIDs() {
	    ArrayList<String> userIDs = new ArrayList<>();
	    Connection connection = null;
	    PreparedStatement preparedStatement = null;
	    ResultSet resultSet = null;
	    
	    try {
	        connection = DBConnectionUtil.getDBConnection();
	        preparedStatement = connection.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_GET_ALL_USER_IDS));
	        resultSet = preparedStatement.executeQuery();
	        
	        while (resultSet.next()) {
	            String userID = resultSet.getString("uId"); // Adjust column name accordingly
	            userIDs.add(userID);
	        }
	    } catch (SQLException | SAXException | IOException | ParserConfigurationException | ClassNotFoundException e) {
	        e.printStackTrace();
	    } finally {
	        try {
	            if (resultSet != null) {
	                resultSet.close();
	            }
	            if (preparedStatement != null) {
	                preparedStatement.close();
	            }
	            if (connection != null) {
	                connection.close();
	            }
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	    
	    return userIDs;
	}
	
	@Override
	public ArrayList<String> getExistingIDs() {
		ArrayList<String> existingUserIDs = new ArrayList<>();
		try {
			connection = DBConnectionUtil.getDBConnection();
			preparedStatement = connection.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_GET_USER_IDS));
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				existingUserIDs.add(resultSet.getString(ProjectConstants.COLUMN_INDEX_ONE));
				}
		} catch (SQLException | SAXException | IOException | ParserConfigurationException | ClassNotFoundException e) {
			// Handle exceptions or log errors
			e.printStackTrace();
		} finally {
			// Close resources
		try {
			if (preparedStatement != null) {
				preparedStatement.close();
			}
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			}
		}
		return existingUserIDs;
	}

	@Override
	public RegisterClass getUserByID(String userID) {
		return actionOnUser(userID).get(0);
	}

	@Override
	public ArrayList<RegisterClass> getuUser() {
		return actionOnUser(null);
	}

	@Override
	public void removeUser(String userID) {
		if (userID != null && !userID.isEmpty()) {
			try {
				connection = DBConnectionUtil.getDBConnection();
				preparedStatement = connection.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_REMOVE_USER));
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_ONE, userID);
				preparedStatement.executeUpdate();
			} catch (SQLException | SAXException | IOException | ParserConfigurationException
					| ClassNotFoundException e) {
				//log.log(Level.SEVERE, e.getMessage());
				e.printStackTrace();
				
			} finally {
				/*
				 * Close prepared statement and database connectivity at the end
				 * of transaction
				 */
				try {
					if (preparedStatement != null) {
						preparedStatement.close();
					}
					if (connection != null) {
						connection.close();
					}
				} catch (SQLException e) {
					//log.log(Level.SEVERE, e.getMessage());
					e.printStackTrace();
				}
			}
		}
	}		

	private ArrayList<RegisterClass> actionOnUser(String userID) {

		ArrayList<RegisterClass> userList = new ArrayList<RegisterClass>();
		try {
			connection = DBConnectionUtil.getDBConnection();
			if (userID != null && !userID.isEmpty()) {
			
				preparedStatement = connection
						.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_GET_USER));
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_ONE, userID);
			}
			else {
				preparedStatement = connection
						.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_ALL_USERS));
			}
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				RegisterClass registerBean = new RegisterClass();
				
				registerBean.setuId(resultSet.getString(ProjectConstants.COLUMN_INDEX_ONE));
				registerBean.setuName(resultSet.getString(ProjectConstants.COLUMN_INDEX_TWO));
				registerBean.setuMail(resultSet.getString(ProjectConstants.COLUMN_INDEX_THREE));
				registerBean.setuPass(resultSet.getString(ProjectConstants.COLUMN_INDEX_FOUR));
				registerBean.setuR_Pass(resultSet.getString(ProjectConstants.COLUMN_INDEX_FIVE));
				
				userList.add(registerBean);
			}
		} catch (SQLException | SAXException | IOException | ParserConfigurationException | ClassNotFoundException e) {
			//log.log(Level.SEVERE, e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (preparedStatement != null) {
					preparedStatement.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				//log.log(Level.SEVERE, e.getMessage());
				e.printStackTrace();
			}
		}
		return userList;
	}

	@Override
	public RegisterClass updateUser(String userID, RegisterClass registerBean) {

		if (userID != null && !userID.isEmpty()) {
			try {
				connection = DBConnectionUtil.getDBConnection();
				preparedStatement = connection
						.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_UPDATE_USER));
				
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_ONE, registerBean.getuId());
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_TWO, registerBean.getuName());
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_THREE, registerBean.getuMail());
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_FOUR, registerBean.getuPass());
				preparedStatement.setString(ProjectConstants.COLUMN_INDEX_FIVE, registerBean.getuR_Pass());
				
				preparedStatement.executeUpdate();

			} catch (SQLException | SAXException | IOException | ParserConfigurationException
					| ClassNotFoundException e) {
				//log.log(Level.SEVERE, e.getMessage());
				e.printStackTrace();
			} finally {
				try {
					if (preparedStatement != null) {
						preparedStatement.close();
					}
					if (connection != null) {
						connection.close();
					}
				} catch (SQLException e) {
					//log.log(Level.SEVERE, e.getMessage());
					e.printStackTrace();
				}
			}
		}
		return getUserByID(userID);
	}

	private ArrayList<String> getUserIDs(){
		
		ArrayList<String> arrayList = new ArrayList<String>();
		try {
			connection = DBConnectionUtil.getDBConnection();
			preparedStatement = connection
					.prepareStatement(QueryUtil.queryByID(ProjectConstants.QUERY_ID_GET_USER_IDS));
			ResultSet resultSet = preparedStatement.executeQuery();
			//loop thru the results adding the first column (uId) into arraylist
			while (resultSet.next()) {
				arrayList.add(resultSet.getString(ProjectConstants.COLUMN_INDEX_ONE));
			}
		} catch (SQLException | SAXException | IOException | ParserConfigurationException
				| ClassNotFoundException e) {
			//log.log(Level.SEVERE, e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (preparedStatement != null) {
					preparedStatement.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				//log.log(Level.SEVERE, e.getMessage());
				e.printStackTrace();
			}
		}
		return arrayList;
	}
}

