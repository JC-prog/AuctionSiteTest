import React, { useEffect, useState, useCallback } from 'react';
import ItemWatchList from '../Components/List/ItemWatchList';
import Item from '../interfaces/Item';
import { fetchItemsFromWatchlist } from '../services/WatchListService';

interface MyWatchListProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const MyWatchList: React.FC<MyWatchListProps> = ({ user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchItemsFromWatchlist(user, currentPage);

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const data: Item[] = response.data.items;
      setItems(data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, currentPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <ItemWatchList listTitle="Watchlist" items={items} username={user} />

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyWatchList;
