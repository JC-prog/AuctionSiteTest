import React, { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';

// Compontent
import Timer from './Timer';

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

interface ItemCardProps{
    item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ( { item }  ) => {
    const navigate = useNavigate();

    // Redirect to Item Page onclick
    const navigateToItem = () => {

        navigate(`/item/${ item.itemId }`)

    }


  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={navigateToItem}>
        <div className="w-full h-40 overflow-hidden">
            <img src="/bike.jpg" alt={item.itemTitle} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
            <h2 className="text-lg font-semibold">{item.itemTitle}</h2>
            <div className="mt-2 text-gray-600">
                <Timer endTime={item.endDate} />
                <p>1 Bid</p>
                <p className="font-bold text-lg">${item.currentPrice.toFixed(2)}</p>
            </div>
        </div>
    </div>
  )
}

export default ItemCard