import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// API
import api from '../config/api/loginApi';

// Config
import "../Styles/ItemForm.scss";

const ItemForm: React.FC = () => {
  const [itemData, setItemData] = useState({
    "description": "",
    "end_date": "",
    "isActive": true,
    "itemTitle": "",
    "sellerId": 4,
    "itemCategoryNum": 0,
    "auctionType": 0,
    "startDate": "",
    "startPrice": 1.0,
    "itemCondition": "",
    "durationPreset": null,
    "minSellPrice": 1.0,
    "listingStatus": "active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/item/create', itemData);
      console.log('Data sent successfully:', response.data);

      if (response.status === 200) {
				  toast.success("Item Created Successful!", {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});
			}

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">

        <div className="form-group">
        <label htmlFor="itemTitle">Item Title:</label>
        <input
            type="text"
            name="itemTitle"
            value={itemData.itemTitle}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
            type="text"
            name="description"
            value={itemData.description}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="minSellPrice">Minimum Sell Price:</label>
        <input
            type="number"
            step="0.01"
            name="minSellPrice"
            value={itemData.minSellPrice}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="startPrice">Start Price:</label>
        <input
            type="number"
            step="0.01"
            name="startPrice"
            value={itemData.startPrice}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="auctionType">Auction Type:</label>
        <input
            type="number"
            name="auctionType"
            value={itemData.auctionType}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="itemCategoryNum">Item Category Number:</label>
        <input
            type="number"
            name="itemCategoryNum"
            value={itemData.itemCategoryNum}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
            type="datetime-local"
            name="startDate"
            value={itemData.startDate}
            onChange={handleChange}
            className="form-control"
        />
        </div>

        <div className="form-group">
        <label htmlFor="itemCondition">Item Condition:</label>
        <input
            type="text"
            name="itemCondition"
            value={itemData.itemCondition}
            onChange={handleChange}
            className="form-control"
        />
        </div>

    <button type="submit" className="submit-button">Submit</button>
  </form>
  );
};

export default ItemForm;
