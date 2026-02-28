import React from 'react';
import { Link } from 'react-router-dom';

// Timer
import Timer from '../Timer';

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
};

const ItemCardListCarousel: React.FC<ItemListProps> = ({ carouselTitle, items }) => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{carouselTitle}</h2>
                <Link to="/all-items" className="text-blue-500 hover:underline">Show all</Link>
            </div>
            <div className="flex flex-wrap gap-4">
                {items.map((item) => (
                    <div key={item.itemId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <Link to={`/item/${item.itemId}`} className="block">
                            <div className="aspect-w-1 aspect-h-1">
                                <img src="/bike.jpg" alt={item.itemTitle} className="w-full h-full object-cover rounded-md mb-4" />
                            </div>
                            <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">${item.currentPrice}</p>
                                <Timer endTime={item.endDate}/>
                            </div>
                        </Link>
                    </div>
                ))}
                
            </div>
            
        </div>
    );
};

export default ItemCardListCarousel;
