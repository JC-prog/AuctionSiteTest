import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiAuctionFill } from 'react-icons/ri';
import Timer from '../Timer';
import FetchBidResponse from '../../interfaces/FetchBidResponse';
import api from '../../config/Api';

type ItemListProps = {
    listTitle: string;
    bids: FetchBidResponse[];
};

const UserItemBidsList: React.FC<ItemListProps> = ({ listTitle, bids }) => {
    const [itemImages, setItemImages] = useState<{ [key: number]: string }>({});
    const [itemPrices, setItemPrices] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        console.log(bids);
        bids.forEach((bid) => {
            fetchItemImage(bid.itemId);
            fetchItemPrices(bid.itemId);
        });
    }, [bids]);

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

    const fetchItemPrices = async (itemId: number) => {
        try {
            const response = await api.get(`/api/item/price/${itemId}`);
            setItemPrices((prev) => ({ ...prev, [itemId]: response.data }));
        } catch (error) {
            console.error('Failed to fetch item price:', error);
        }
    };

    return (
        <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <RiAuctionFill className="text-green-600" /> {listTitle}
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                    <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                        <div className="col-span-1 text-center">
                            <span className="text-gray-500">Index</span>
                        </div>
                        <div className="col-span-1">Item</div>
                        <div className="col-span-3">
                            <span className="text-gray-700 font-semibold"></span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-700 font-semibold">Time Left</span>
                        </div>
                        <div className="col-span-1">
                            <span className="text-gray-700 font-semibold">Status</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-700 font-semibold">Bid Price</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-700 font-semibold">Item Price</span>
                        </div>
                    </div>
                </div>
                {bids.length > 0 ? (
                    bids.map((bid, index) => (
                        <div key={bid.id} className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                            <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                                <div className="col-span-1 text-center">
                                    <span className="text-gray-500">{index + 1}</span>
                                </div>
                                <div className="col-span-1">
                                    <img src={itemImages[bid.itemId] || "/upload-photo.jpg"} alt={bid.itemTitle} className="w-12 h-12 object-cover rounded-md" />
                                </div>
                                <div className="col-span-3">
                                    <Link to={`/item/${bid.itemId}`} className="block">
                                        <h3 className="text-lg font-medium">{bid.itemTitle}</h3>
                                    </Link>
                                </div>
                                <div className="col-span-2">
                                    <Timer endTime={bid.endDate} />
                                </div>
                                <div className="col-span-1">
                                    <span></span>
                                </div>
                                <div className="col-span-2 space-x-2">
                                    <span className="text-gray-500">${bid.bidAmount}</span>
                                </div>
                                <div className="col-span-2 space-x-2">
                                    <span className="text-gray-500">${itemPrices[bid.itemId]}</span>
                                </div>
                            </div>
                        </div>
                        ))
                        ) : (
                            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
                            <p className="text-lg text-gray-500">No Bids</p>
                            </div>
                    )}
                </div>
        </div>
    );
};

export default UserItemBidsList;
