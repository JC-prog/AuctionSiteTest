import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls

type Item = {
    itemId: number;
    image: string;
    title: string;
    price: number;
};

type ItemListProps = {
    carouselTitle: string;
    items: Item[];
};

const ItemCardListCarousel: React.FC<ItemListProps> = ({ carouselTitle, items }) => {
    const [itemImages, setItemImages] = useState<Record<number, string>>({});

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = items.map(async (item) => {
                try {
                    const response = await axios.get(`api/item/image/${item.itemId}`, {
                        responseType: 'blob', // Assuming the response is an image
                    });
                    const imageUrl = URL.createObjectURL(response.data);
                    return { itemId: item.itemId, imageUrl };
                } catch (error) {
                    console.error(`Error fetching image for item ${item.itemId}:`, error);
                    return { itemId: item.itemId, imageUrl: '' };
                }
            });

            const images = await Promise.all(imagePromises);
            const imageMap = images.reduce((acc, { itemId, imageUrl }) => {
                acc[itemId] = imageUrl;
                return acc;
            }, {} as Record<number, string>);

            setItemImages(imageMap);
        };

        fetchImages();
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
                                        src={itemImages[item.itemId] || item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-md mb-4"
                                    />
                                </div>
                                <h3 className="text-lg font-medium">{item.title}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                </div>
                            </Link>
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

export default ItemCardListCarousel;
