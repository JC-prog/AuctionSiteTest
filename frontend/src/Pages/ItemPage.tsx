import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import api from '../config/api/loginApi';
import Timer from '../Components/Timer';
import TradePopup from '../Components/Popup/TradePopup';
import BidConfirmPopup from '../Components/Popup/BidConfirmPopup';

// API Function Calls
import { fetchItemByItemId } from '../services/ItemService';
import { countBids } from '../services/BidService';

// Interface
import Item from '../interfaces/Item';
import { logClickCategory } from '../services/ClickstreamService';
import { countTrades } from '../services/TradeRequestService';
// import LikeButton from '../Components/Interactive/LikeButton';

interface AuthProps {
    isAuth?: boolean;
    user: string | null | undefined;
}

const ItemPage: React.FC<AuthProps> = ({ isAuth, user }) => {
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item>();
    const [numOfBids, setNumOfBids] = useState(0);
    const [numOfTrades, setNumOfTrades] = useState(0);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [itemImage, setItemImage] = useState<string | null>(null);
    const [itemImageError, setItemImageError] = useState(false);
    // const [itemLiked, setItemLiked] = useState<boolean>(false);

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
                const itemResponse = await fetchItemByItemId(parseInt(itemId));

                if (itemResponse.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setItem(itemResponse.data);

                if(item?.auctionType == 'trade')
                {
                    const numTradesResponse  = await countTrades(itemId);

                    if (numTradesResponse.status != 200)
                    {
                        throw new Error("Network response was not ok");
                    }

                    setNumOfTrades(numTradesResponse.data);

                } else {
                    const numBidsResponse  = await countBids(itemId);

                    if (numBidsResponse.status != 200)
                    {
                        throw new Error("Network response was not ok");
                    }

                    setNumOfBids(numBidsResponse.data);
                }
                
                
                if (isAuth && item?.itemCategory != null) {
                    logClickCategory(user, item?.itemCategory);
                }
                
                // Fetch Item Image
                const imageResponse = await api.get(`/api/item/image/${itemId}`, { responseType: 'arraybuffer' });
                const blob = new Blob([imageResponse.data], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setItemImage(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                setItemImageError(true); // Set error state when fetching image fails
                console.error('Failed to fetch item image:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    // Fetch User Photo
    useEffect(() => {
        if (!item?.sellerName) return;

        const fetchProfilePhoto = async () => {
            try {
                const response = await api.get(`/api/user/photo/${item.sellerName}`, { responseType: 'arraybuffer' });
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUserImage(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch profile photo:', error);
            }
        };

        fetchProfilePhoto();
    }, [item?.sellerName]);

    // Render Auction Type
    const renderAuctionType = (item?: Item) => {
        switch (item?.auctionType) {
            case "low-start-high":
                return <>Low Start High</>;
            case "price-up":
                return <>Price Up</>;
            case "trade":
                return <>Trade</>;
            default:
                return <>Unknown Auction</>;
        };
    };

    // Render Status
    const renderStatus = (item?: Item) => {
        switch (item?.status) {
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
                        <img
                            src={itemImageError ? "/upload-photo.png" : itemImage || "/upload-photo.png"}
                            alt="Item Image"
                            className="w-48 h-48 object-cover rounded-md shadow-md mb-4"
                        />
                        <div className="flex space-x-2">
                            {/* <LikeButton isLiked={itemLiked} username={user} itemId={itemId}/> */}
                        </div>
                    </div>
                    {/* Info Section */}
                    <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
                        <h1 className="text-2xl font-semibold mb-4">{item?.itemTitle}</h1>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium">Auction Type</p>
                                <span className="font-medium">{renderAuctionType(item)}</span>
                            </div>

                            {item?.auctionType == 'low-start-high' && ( 
                                <div className="flex justify-between">
                                    <p className="font-medium">Minimum Sell Price</p>
                                    <span className="font-medium">${item?.minSellPrice.toFixed(2)}</span>
                                </div>
                            )}
                            
                            {item?.auctionType != 'trade' && ( 
                                <div className="flex justify-between">
                                    <p className="font-medium">Current Price</p>
                                    <span className="font-medium">${item?.currentPrice.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <p className="font-medium">Time left</p>
                                {renderStatus(item)}
                            </div>
                            <div className="flex justify-between">
                                {item?.auctionType === 'trade' ? (
                                    <>
                                        <p className="font-medium">Trade</p>
                                        <span className="font-medium">{numOfTrades} Trade Requests</span>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-medium">Bids</p>
                                        <span className="font-medium">{numOfBids} Bids</span>
                                    </>
                                )}
                                
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-4">
                            {item?.auctionType === 'trade' ? (
                                <>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={openPopup}>
                                        Trade
                                    </button>
                                    {isPopupOpen && <TradePopup itemId={item?.itemId} username={user} onClose={closePopup} />}
                                </>
                            ) : (
                                <>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setIsBidConfirmPopupOpen(true)}>
                                        Place Bid
                                    </button>
                                    {isBidConfirmPopupOpen && <BidConfirmPopup itemId={item?.itemId} username={user} onClose={() => setIsBidConfirmPopupOpen(false)} />}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Seller Section */}
                <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 flex items-center">
                        <img
                            src={userImage || "/profile-pic-placeholder.jpg"}
                            alt="Seller Image"
                            className="w-24 h-24 object-cover rounded-full shadow-md"
                        />
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
