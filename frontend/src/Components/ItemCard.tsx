import React from 'react'
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
    <div className="bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-wrap gap-4" onClick={navigateToItem}>
      
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg">
                <img src="/test.jpg" alt="Item" className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                <Timer endTime={item.endDate} />
                <p className="text-sm text-gray-400">${item.currentPrice.toFixed(2)}</p>
            </div>
        </div>
  )
}

export default ItemCard