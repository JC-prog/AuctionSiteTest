import React from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { FiEdit, FiUpload } from 'react-icons/fi';

// Config
import api from '../../config/api/loginApi';

import Timer from '../../Components/Timer';
import { User } from 'lucide-react';

interface Item {
    itemId: number;
    itemTitle: string;
    itemCategory: string;
    itemCondition: string;
    description: string;
    auctionType: string;
    endDate: Date;
    startPrice: number;
    currentPrice: number;
    status: string;
  }

type ItemListProps = {
    listTitle: string;
    items: Item[];
};

const UserItemList: React.FC<ItemListProps> = ({ items }) => {

    // Launch Listing
  const launchListing = async (itemId: number) => {
    try {
      const response: AxiosResponse = await api.post(`/api/item/launch`, { itemId });

      if (response.status === 200) {
        toast.success('Item Launched!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to Launch. Please try again later.', {
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

    return (
        <div className="mb-8 lg:mb-0">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                        <div className="col-span-1 text-center">
                            <span className="text-gray-500">Index</span>
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-3">Item Title</div>
                        <div className="col-span-1">Starting Price</div>
                        <div className="col-span-1 text-center">Current Price</div>
                        <div className="col-span-2 text-center ">Time Left</div>
                        <div className="col-span-1 text-center ">Status</div>
                        <div className="col-span-2">Action</div>
                    </div>
                </div>

                {items.map((item, index) => (
                    <div key={item.itemId} className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                        <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                            <div className="col-span-1 text-center">
                                <span className="text-gray-500">{index + 1}</span>
                            </div>

                            {/* Time Left */}
                            <div className="col-span-1">
                                <img src="/bike.jpg" className="w-12 h-12 object-cover rounded-md" />
                            </div>

                            {/* Item Title */}
                            <div className="col-span-3">
                                <Link to={`/item/${item.itemId}`} className="block">
                                    <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                                    <p className="text-sm text-gray-500">1 Bid</p>
                                </Link>
                            </div>

                            <div className="col-span-1">
                                <p className="text-sm text-gray-500">{item.startPrice}</p>
                            </div>

                            <div className="col-span-1">
                                <p className="text-sm text-gray-500">{item.currentPrice}</p>
                            </div>

                             {/* Time Left */}
                            <div className="col-span-1 text-center">
                                <Timer endTime={item.endDate} />
                            </div>

                             {/* Status */}
                            <div className="col-span-1 text-right flex items-center justify-end space-x-2">
                                {item.status}
                            </div>

                            {/* Action */}
                            <div className="col-span-2 flex items-center justify-end space-x-2">
                                {item.status ? (
                                    <>
                                        <button 
                                            className="text-red-600 hover:text-red-900 focus:outline-none flex items-center"
                                            onClick={() => deleteListing(item.itemId)}
                                        >
                                            <FiTrash className="mr-1" /> Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            to={`/item/edit/${item.itemId}`} 
                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none flex items-center"
                                        >
                                            <FiEdit className="mr-1" /> Edit
                                        </Link>
                                        <button 
                                            className="text-green-600 hover:text-green-900 focus:outline-none flex items-center"
                                            onClick={() => launchListing(item.itemId)}
                                        >
                                            <FiUpload className="mr-1" /> Launch
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-900 focus:outline-none flex items-center"
                                            onClick={() => deleteListing(item.itemId)}
                                        >
                                            <FiTrash className="mr-1" /> Delete
                                        </button>
                                    </>
                                        )}
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserItemList;
