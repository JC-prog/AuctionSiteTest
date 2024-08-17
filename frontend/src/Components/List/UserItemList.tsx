import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiUpload } from 'react-icons/fi';
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { FaStop, FaExclamationCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

// Config
import api from '../../config/api/loginApi';
import { launchItem, acceptBid, rejectBid, stopListing } from '../../services/ItemService'; 

import Timer from '../../Components/Timer';
import Item from '../../interfaces/Item'; 

interface ItemListProps {
  listTitle: string;
  items: Item[];
}

const UserItemList: React.FC<ItemListProps> = ({ items }) => {
  // State to store item images
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

  // Fetch images for all items on component mount
  useEffect(() => {
    items.forEach((item) => fetchItemImage(item.itemId));
  }, [items]);

  // Launch Listing
  const launchListing = async (itemId: number) => {
    try {
      const response = await launchItem(itemId);
      console.log(response);
  
      if (response.status === 200) {
        toast.success(response.data.message || 'Item launched successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(response.data.message || 'Failed to launch item.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Launch. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  // Accept Bid
  const handleAccept = async (itemId: number) => {
    try {
      const response = await acceptBid(itemId);
      console.log(response);
  
      if (response.status === 200) {
        toast.success(response.data.message || 'Bid Accepted', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(response.data.message || 'Failed to accept Bid', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Accept. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  // Reject Bid
  const handleReject = async (itemId: number) => {
    try {
      const response = await rejectBid(itemId);
      console.log(response);
  
      if (response.status === 200) {
        toast.success(response.data.message || 'Bid Rejected', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(response.data.message || 'Failed to reject bid', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Reject. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  // Handle Stop
  const handleStop = async (itemId: number) => {
    try {
      const response = await stopListing(itemId);
      console.log(response);
  
      if (response.status === 200) {
        toast.success(response.data.message || 'Stop Successful', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(response.data.message || 'Failed to stop Listing', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Stop. Please try again later.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  // Render Status
  const renderStatus = (item: Item) => {
    switch (item.status) {
      case "CREATED":
        return <p>Not Started</p>;
      case "SOLD":
        return <p>Sold</p>;
      case "LISTED":
        return <Timer endTime={item.endDate} />;
      default:
        return <p></p>;
    };
  };

  // Render Available Actions
  const renderActions = (item: Item) => {
    switch (item.status) {
      case "CREATED":
      case "EXPIRED":
        return (
            <>
                <Link 
                    to={`/item/edit/${item.itemId}`} 
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none flex items-center px-1"
                >
                    <FiEdit className="mr-1" /> Edit
                </Link>
                <button 
                    className="text-green-600 hover:text-green-900 focus:outline-none flex items-center px-1"
                    onClick={() => launchListing(item.itemId)}
                >
                    <FiUpload className="mr-1" /> Launch
                </button>
            </>);
      case "FINISHED":
        return (
            <>
                <button 
                    className="text-green-600 hover:text-green-900 focus:outline-none flex items-center px-1"
                    onClick={() => launchListing(item.itemId)}
                >
                    <FiUpload className="mr-1" /> Re-Launch
                </button>
                <button 
                    className="text-green-600 hover:text-green-900 focus:outline-none flex items-center px-1"
                    onClick={() => handleAccept(item.itemId)}
                >
                    <TiTick className="mr-1" /> Accept
                </button>
                <button 
                    className="text-red-600 hover:text-red-900 focus:outline-none flex items-center px-1"
                    onClick={() => handleReject(item.itemId)}
                >
                    <MdCancel className="mr-1" /> Reject
                </button>
            </>
        );
      case "LISTED":
        return (
            <>
            {item.auctionType === 'low-start-high' && (
              <button
                className="text-red-600 hover:text-red-900 focus:outline-none flex items-center px-1"
                onClick={() => handleStop(item.itemId)}
              >
                <FaStop className="mr-1" /> Stop
              </button>
            )}

            {item.auctionType !== 'low-start-high' && (
              <button
                className="text-green-600 hover:text-green-900 focus:outline-none flex items-center px-1"
              >
                <FaExclamationCircle className="mr-1" /> Trading Bidding in Progress
              </button>
            )}
          </>
          );
      case "SUSPENDED":
        return (
            <>
                <button 
                    className="text-yellow-500 hover:text-yellow-700 focus:outline-none flex items-center px-1"
                   
                >
                    <FaExclamationCircle className="mr-1" /> Under Investigation
                </button>
            </>
        );
      default:
        return <p></p>;
    };
  };

  return (
    <div className="mb-8 lg:mb-0">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
          <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
            <div className="col-span-1 text-center">
              <span className="text-gray-500">Index</span>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2">Item Title</div>
            <div className="col-span-1">Initial</div>
            <div className="col-span-1">Current</div>
            <div className="col-span-2">Time Left</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Action</div>
          </div>
        </div>
        <div>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.itemId} className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                  <div className="col-span-1 text-center">
                    <span className="text-gray-500">{index + 1}</span>
                  </div>
                  <div className="col-span-1">
                    <img
                      src={itemImages[item.itemId] || "/image-placeholder.jpeg"} // Fallback image
                      alt="Item"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <Link to={`/item/${item.itemId}`} className="block">
                      <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                    </Link>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-gray-500 px-1">${item.startPrice}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-gray-500 px-1">${item.currentPrice}</p>
                  </div>
                  <div className="col-span-2">
                    {renderStatus(item)}
                  </div>
                  <div className="col-span-1 flex items-center">
                    {item.status}
                  </div>
                  <div className="col-span-3 flex items-center">
                    {renderActions(item)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-lg text-gray-500">No Listings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItemList;
