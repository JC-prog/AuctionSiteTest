import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import { IoMdTrendingUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import Timer from '../Timer'; // Assuming Timer component is already defined
import api from '../../config/Api';
import Item from '../../interfaces/Item';
import { removeItemFromWatchlist } from '../../services/WatchListService';
import { FaHeart } from 'react-icons/fa';

type ItemListProps = {
  listTitle: string;
  items: Item[];
  username: string | null | undefined;
};

const ItemWatchList: React.FC<ItemListProps> = ({ listTitle, items, username }) => {
  const [itemImages, setItemImages] = useState<{ [key: number]: string }>({});

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

  // Fetch images for all items on component mount or items change
  useEffect(() => {
    items.forEach((item) => fetchItemImage(item.itemId));
  }, [items]);

  // Remove item from watchlist
  const handleRemove = async (itemId: number) => {
    try {
      const response = await removeItemFromWatchlist(itemId, username);

      if (response.status === 200) {
        toast.success(response.data.message || 'Removed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message || 'Failed to Remove', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Remove. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="mb-8 lg:mb-0">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaHeart className="text-red-600" /> {listTitle}
      </h2>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
          <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
            <div className="col-span-1 text-center">
              <span className="text-gray-500">Index</span>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-4">
              <span className="text-gray-700 font-semibold">Item</span>
            </div>
            <div className="col-span-3">
              <span className="text-gray-700 font-semibold">Status</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-700 font-semibold">Price</span>
            </div>
            <div className="col-span-1 flex justify-center">
              <span className="text-gray-700 font-semibold">Action</span>
            </div>
          </div>
        </div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.itemId} className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
              <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                <div className="col-span-1 text-center">
                  <span className="text-gray-500">{index + 1}</span>
                </div>
                <div className="col-span-1">
                  <img src={itemImages[item.itemId] || "/bike.jpg"} alt={item.itemTitle} className="w-12 h-12 object-cover rounded-md" />
                </div>
                <div className="col-span-4">
                  <Link to={`/item/${item.itemId}`} className="block">
                    <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                  </Link>
                </div>
                <div className="col-span-3">
                  <Timer endTime={item.endDate} />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <IoMdTrendingUp className="text-green-600" />
                  <span className="text-gray-500">${item.currentPrice}</span>
                  <p className="text-xs text-gray-400">Since Last Added</p>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleRemove(item.itemId)}
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-lg text-gray-500">No Items in Watchlist</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ItemWatchList;