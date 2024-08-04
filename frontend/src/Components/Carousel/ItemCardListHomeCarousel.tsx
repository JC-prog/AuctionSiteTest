import React, { useState, useEffect } from 'react';
import LikeButton from '../../Components/Interactive/LikeButton';
import { Link } from 'react-router-dom';
import { IoIosArrowDropright } from "react-icons/io";

// Utilities Component
import Timer from '../../Components/Timer';
import api from '../../config/Api'

interface Item {
    itemId: number;
    itemTitle: string;
    itemCategory: string;
    itemCondition: string;
    description: string;
    auctionType: string;
    endDate: Date;
    currentPrice: number;
}

type ItemListProps = {
    carouselTitle: string;
    items: Item[];
    username: string;
};

const ItemCardListHomeCarousel: React.FC<ItemListProps> = ({ carouselTitle, items, username }) => {
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

    // Fetch images for all items on component mount or items change
    useEffect(() => {
        items.forEach((item) => fetchItemImage(item.itemId));
    }, [items]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{carouselTitle}</h2>
                <Link to="/all-items" className="text-blue-500 hover:underline">Show all</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.itemId}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <Link to={`/item/${item.itemId}`} className="block">
                                <div className="aspect-w-1 aspect-h-1">
                                    <img
                                        src={itemImages[item.itemId] || '/upload-photo.png'} // Fallback image
                                        alt={item.itemTitle}
                                        className="w-full h-full object-cover rounded-md mb-4"
                                    />
                                </div>
                                <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                            </Link>
                            <LikeButton imageUrl="https://example.com/image.jpg" isLiked={false} username={username} itemId={item.itemId} />
                            <Timer endTime={item.endDate} />
                            <p className="text-sm text-gray-400">${item.currentPrice.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gray-200 p-4 rounded-lg shadow-lg flex items-center justify-center">
                        <p className="text-lg text-gray-500">No Listing</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCardListHomeCarousel;
