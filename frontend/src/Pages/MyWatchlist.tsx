import React, { useEffect, useState } from 'react';
import ItemWatchList from '../Components/List/ItemWatchList';
import Item from '../interfaces/Item';
import { fetchItemsFromWatchlist } from '../services/WatchListService';

interface MyWatchListProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const MyWatchList: React.FC<MyWatchListProps> = ({ user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchItemsFromWatchlist(user);

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const data: Item[] = response.data;
        setItems(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <ItemWatchList listTitle="Watchlist" items={items} username={user} />
    </div>
  );
};

export default MyWatchList;
