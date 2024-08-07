import React from 'react';
import { Link } from 'react-router-dom';

// Interface
import { Item } from '../../interfaces/IItem';

const ProductCard: React.FC<{ item: Item }> = ({ item }) => {
    const { itemId, itemTitle, itemPhoto, currentPrice } = item;
    const imageUrl = typeof itemPhoto === 'string' ? itemPhoto : '';

    return (
        <div className="w-48 rounded overflow-hidden shadow-lg m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <Link to={`/item/${itemId}`}>
                <img className="w-full h-32 object-cover" src={imageUrl} alt={itemTitle} />
                <div className="px-4 py-2">
                    <div className="font-bold text-md mb-1">{itemTitle}</div>
                    <p className="text-gray-700 text-sm">${currentPrice.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
