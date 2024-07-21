import React from 'react';
import UserItemBidsList from '../Components/List/UserItemBidsList';

// Example data for items (replace with actual data or fetch from API)
const items = [
  { itemId: 1, itemTitle: 'Item 1', itemPrice: 100 },
  { itemId: 2, itemTitle: 'Item 2', itemPrice: 150 },
  { itemId: 3, itemTitle: 'Item 3', itemPrice: 200 },
];

const ItemsTable: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <UserItemBidsList listTitle="My Bids" items={items} />
  </div>
  );
};

export default ItemsTable;
