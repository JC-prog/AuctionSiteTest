import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

// Config
import api from '../config/api/loginApi';

// Components
import ItemCard from "../Components/ItemCard";

// Interface
interface Item {
  itemId: number;
  itemTitle: string;
  itemCategoryNum: number;
  minSellPrice: number;
}

interface PaginatedResponse {
  content: Item[];
  // Add other pagination properties if needed
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const query = useQuery().get('keyword');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<PaginatedResponse> = await api.get(`/api/items/search?keyword=${query}`);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setItems(response.data.content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchItems();
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
        {query && <p className="text-lg mb-4">Results for "{query}"</p>}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {items.map(item => (
            <ItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
