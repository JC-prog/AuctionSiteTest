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
    <div className="search-page-wrapper">
      <h1>Search Results</h1>
      {query && <p>Results for "{query}"</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        {items.map(item => (
          <ItemCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
