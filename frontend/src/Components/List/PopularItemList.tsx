import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Timer 
import Timer from '../Timer';

// Interfaces
import Item from '../../interfaces/Item';

// Config
import api from '../../config/Api';

type ItemListProps = {
  listTitle: string;
  items: Item[];
};

// API Function Calls
import { countBids } from '../../services/BidService';

const PopularItemList: React.FC<ItemListProps> = ({ listTitle, items }) => {
  const [itemImages, setItemImages] = useState<{ [key: number]: string }>({});
  const [numOfBids, setNumOfBids] = useState<{ [key: number]: number }>({});

  // Fetch item images
  const fetchItemImage = async (itemId: number) => {
    try {
      const response = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImages((prev) => ({ ...prev, [itemId]: reader.result as string }));
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Failed to fetch item image:', error);
    }
  };

  // Fetch Item Bids
  const computeBids = async (itemId: number) => {
    try {
      const numBidsResponse = await countBids(itemId.toString());
      setNumOfBids((prev) => ({ ...prev, [itemId]: numBidsResponse.data }));
    } catch (error) {
      console.error('Failed to fetch bids:', error);
    }
  };

  // Fetch images and bids for all items on component mount
  useEffect(() => {
    items.forEach((item) => {
      computeBids(item.itemId);
      fetchItemImage(item.itemId);
    });
  }, [items]);

  return (
    <div className="lg:w-2/3 mb-8 lg:mb-0">
      <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {items.map((item, index) => (
          <Link
            to={`/item/${item.itemId}`}
            key={item.itemId}
            className="px-2 block transform transition-transform duration-300 hover:bg-gray-100"
          >
            <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
              <div className="col-span-1 text-center">
                <span className="text-gray-500">{index + 1}</span>
              </div>
              <div className="col-span-2">
                <img
                  src={itemImages[item.itemId] || "/image-placeholder.jpeg"}
                  className="w-12 h-12 object-cover rounded-md"
                  alt={item.itemTitle}
                />
              </div>
              <div className="col-span-4">
                <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                <p className="text-sm text-gray-500">{numOfBids[item.itemId] || 0} Bid(s)</p>
              </div>
              <div className="col-span-3 text-center">
                <Timer endTime={item.endDate}/>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-gray-500">${item.currentPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularItemList;
