package com.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class BuyerTransaction extends Transaction{
	    private String BuyerName;
	    private String BuyerAddress;
	    private String BuyerEmail;
	    private String BuyerPhone;
	    
	    
		public String getBuyerName() {
			return BuyerName;
		}
		public void setBuyerName(String buyerName) {
			BuyerName = buyerName;
		}
		public String getBuyerEmail() {
			return BuyerEmail;
		}
		public void setBuyerEmail(String buyerEmail) {
			BuyerEmail = buyerEmail;
		}
		public String getBuyerAddress() {
			return BuyerAddress;
		}
		public void setBuyerAddress(String buyerAddress) {
			BuyerAddress = buyerAddress;
		}
		public String getBuyerPhone() {
			return BuyerPhone;
		}
		public void setBuyerPhone(String buyerPhone) {
			BuyerPhone = buyerPhone;
		}

}
