import React from 'react';

interface CardProps {
  title: string;
  price: string;
  timeLeft: string;
  imageUrl: string;
}

const ItemCard: React.FC<CardProps> = () => {
  return (
    

    <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gray-800 p-4 rounded-lg shadow-lg">
                <img src="/test.jpg" alt="Item" className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-medium">SABOTAGE</h3>
                <p className="text-sm text-gray-400">Latest Release • Single</p>
            </div>
        </div>
  );
};

export default ItemCard;
