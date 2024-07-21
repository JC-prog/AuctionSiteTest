import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { AxiosResponse } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import api from '../config/api/loginApi';
import Timer from '../Components/Timer';
import TradePopup from '../Components/Popup/TradePopup';
import BidConfirmPopup from '../Components/Popup/BidConfirmPopup';
import { toast } from 'react-toastify';

// Interface
interface Item {
    itemTitle: number;
    itemCategory: string;
    itemCondition: string;
    description: string;
    auctionType: string;
    endDate: Date;
    currentPrice: number;
    sellerName: string;
}

interface AuthProps {
    isAuth: boolean;
    user: string;
  }

const ItemPage: React.FC<AuthProps> = ({ isAuth, user }) => {
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);

    // Popup
    const [isBidConfirmPopupOpen, setIsBidConfirmPopupOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // States
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Get Item Info
    useEffect(() => {
        if (!itemId) {
            setLoading(false);
            setError(new Error("Item ID is not provided"));
            return;
        }

        const fetchItem = async () => {
            try {
                const response: AxiosResponse<Item> = await api.get(`/api/item/${itemId}`);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setItem(response.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    // Bid Item
    const bidItem = async (itemId: number) => {
        try {
          const response: AxiosResponse = await api.post(`/api/bid`, { user, item });
    
          if (response.status === 200) {
            toast.success('Item Successful!', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
    
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error('Failed to Bid. Please try again.', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to Bid. Please try again later.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      };
    

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="loader">Loading...</div></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
                {/* Main Section */}
                <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-12 gap-4">
                    {/* Photo Section */}
                    <div className="col-span-12 md:col-span-4 flex flex-col items-center">
                        <img src="/upload-photo.png" alt="Item Image" className="w-48 h-48 object-cover rounded-md shadow-md mb-4" />
                        <div className="flex space-x-2">
                            <button className="p-2 bg-gray-200 rounded-full">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button className="p-2 bg-gray-200 rounded-full">
                                <FontAwesomeIcon icon={faBookmark} />
                            </button>
                        </div>
                    </div>
                    {/* Info Section */}
                    <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
                        <h1 className="text-2xl font-semibold mb-4">{item?.itemTitle}</h1>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium">Current Price</p>
                                <span className="font-medium">${item?.currentPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Time left</p>
                                <Timer endTime={item?.endDate} />
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Bids</p>
                                <span className="font-medium">0 Bids</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            {/* Bid */}
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => setIsBidConfirmPopupOpen(true)}
                            >
                                Place Bid
                            </button>
                            {isBidConfirmPopupOpen && <BidConfirmPopup itemid= {itemId} onClose={() => setIsBidConfirmPopupOpen(false)} />}

                            {/* Trade */}
                            <button 
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                onClick={openPopup}
                            >
                                Trade
                            </button>
                            {isPopupOpen && <TradePopup onClose={closePopup} />}
                        </div>
                    </div>
                </div>

                {/* Seller Section */}
                <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 flex items-center">
                        <img src="/upload-photo.png" alt="Seller Image" className="w-24 h-24 object-cover rounded-full shadow-md" />
                        <div className="ml-4">
                            <p className="font-semibold">{item?.sellerName}</p>
                            <span className="text-yellow-500 text-lg">5 ★</span>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center mt-4 md:mt-0">
                        <Link to={`/user/${item?.sellerName}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            View Profile
                        </Link>
                    </div>
                </div>

                {/* Details Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Details</h2>
                    <div className="mb-4">
                        <label className="block font-medium">Description</label>
                        <p>{item?.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">Condition</label>
                            <p>{item?.itemCondition}</p>
                        </div>
                        <div>
                            <label className="block font-medium">Category</label>
                            <p>{item?.itemCategory}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;
