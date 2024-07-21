import React from 'react';
import { Link } from 'react-router-dom';

// Timer component (assuming it's already defined)
const Timer: React.FC = () => {
    // Timer logic here
    return <span>Time left: 10h 5m</span>;
};

type Item = {
    itemId: number;
    image: string;
    title: string;
    price: number;
};

type ItemListProps = {
    listTitle: string;
    items: Item[];
};

const ItemList: React.FC<ItemListProps> = ({ listTitle, items }) => {
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
                                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
                            </div>
                            <div className="col-span-4">
                                <h3 className="text-lg font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500">1 Bid</p>
                            </div>
                            <div className="col-span-3 text-center">
                                <Timer />
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-gray-500">${item.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
