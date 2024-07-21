import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";

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

const ItemWatchList: React.FC<ItemListProps> = ({ listTitle, items }) => {
    return (
        <div className="mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {items.map((item, index) => (
                    <div key={item.itemId} className="px-2 block transform transition-transform duration-300 hover:bg-gray-100">
                        <div className="grid grid-cols-12 items-center py-4 border-b border-gray-200">
                            <div className="col-span-1 text-center">
                                <span className="text-gray-500">{index + 1}</span>
                            </div>
                            <div className="col-span-2">
                                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
                            </div>
                            <div className="col-span-3">
                                <Link to={`/item/${item.itemId}`} className="block">
                                    <h3 className="text-lg font-medium">{item.title}</h3>
                                    <p className="text-sm text-gray-500">1 Bid</p>
                                </Link>
                            </div>
                            <div className="col-span-3 text-center">
                                <Timer />
                            </div>
                            <div className="col-span-2 text-right flex items-center justify-end space-x-2">
                                <IoMdTrendingUp className="text-green-600"/>
                                <span className="text-gray-500">${item.price}</span>
                                <p className="text-xs">Since Last Added</p>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button className="text-gray-500 hover:text-red-500">
                                    <FiTrash size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemWatchList;
