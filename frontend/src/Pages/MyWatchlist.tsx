import React from 'react';
import ItemWatchList from '../Components/List/ItemWatchList';

const items: Item[] = [
  {
      itemId: 1,
      image: '/bike.jpg',
      title: 'Bike',
      price: 20,
  },
  {
      itemId: 2,
      image: '/bike.jpg',
      title: 'Laptop',
      price: 500,
  },
  // Add more items here
];

interface PaginatedResponse {
  content: Item[];
  // Add other pagination properties if needed
}

const MyWatchList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <ItemWatchList listTitle="Watchlist" items={items} />
    </div>
  );
};

export default MyWatchList;
