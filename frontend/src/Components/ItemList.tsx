// ItemList.tsx
import React from 'react';
import ItemCard from './ItemCard';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';

interface Item {
  itemId: number; // Add this if itemId is present in the Item interface
  itemTitle: string;
  itemCategory: string;
  itemCondition: string;
  description: string;
  auctionType: string;
  endDate: Date;
  currentPrice: number;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const navigate = useNavigate();

  const navigateToItem = () => {

    navigate(`/item/${ item.itemId }`)

}

  return (

    <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Just For You</h2>

        <div className="flex flex-wrap gap-4">
          {items.map(item => (
            <div className="bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-wrap gap-4" onClick={navigateToItem}>
      
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg">
                <img src="/test.jpg" alt="Item" className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                <Timer endTime={item.endDate} />
                <p className="text-sm text-gray-400">${item.currentPrice.toFixed(2)}</p>
            </div>
        </div>
          ))}
        </div>  
    </div> 

  );
};

export default ItemList;
