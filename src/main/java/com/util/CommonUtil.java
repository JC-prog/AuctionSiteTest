package com.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

//import oop.webApp.service.IItemService; to implement
import com.util.ProjectConstants;
import com.util.QueryUtil;

public class CommonUtil {

	/** Initialize logger */
	//public static final Logger log = Logger.getLogger(IItemService.class.getName());

	public static final Properties properties = new Properties();

	static {
		try {
			
			// Read the property only once when load the class
			properties.load(QueryUtil.class.getResourceAsStream(ProjectConstants.PROPERTY_FILE));
			
		} catch (IOException e) {
			//to implement log.log(Level.SEVERE, e.getMessage());
		}
	}

	/**
	 * Add new Item ID
	 * 
	 * @param arrayList
	 * @return
	 */
	public static String generateIDs(ArrayList<String> arrayList) {

		String id;
		int next = arrayList.size()+1;
		id = ProjectConstants.ITEM_ID_PREFIX + next;
		while (arrayList.contains(id)) {
			next++;
			id = ProjectConstants.ITEM_ID_PREFIX + next;
		}
		return id;
	}
}
