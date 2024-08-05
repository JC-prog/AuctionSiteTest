import React, { useEffect, useState }from 'react';
import UserItemBidsList from '../Components/List/UserItemBidsList';
import { AxiosResponse } from 'axios';
import Bid from '../interfaces/Bid';
import { fetchBids } from '../services/BidService';

// Example data for items (replace with actual data or fetch from API)
const items = [
  { itemId: 1, itemTitle: 'Item 1', itemPrice: 100 },
  { itemId: 2, itemTitle: 'Item 2', itemPrice: 150 },
  { itemId: 3, itemTitle: 'Item 3', itemPrice: 200 },
];

interface AuthProps {
    isAuth: boolean;
    user: string;
  }

const ItemsTable: React.FC<AuthProps> = ({ isAuth, user }) => {
    const [items, setItems] = useState<Bid[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const username = user;

    // Fetch Bids
    useEffect(() => {
        const fetchUserBids= async () => {
        console.log(user);
        try {
            const response: AxiosResponse = await fetchBids(username);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
                
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

    fetchUserBids();
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <UserItemBidsList listTitle="My Bids" items={items} />
  </div>
  );
};

export default ItemsTable;
