import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useLocation, Link } from 'react-router-dom';

// Config
import api from '../config/api/loginApi';

// Components
import ItemCard from "../Components/Cards/ItemCard";

// Timer
import Timer from '../Components/Timer';

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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
      
      {/* Display the search query if it exists */}
      {query && <p className="text-lg mb-4">Results for "{query}"</p>}
      
      {/* Show loading state */}
      {loading && <p className="text-blue-500">Loading...</p>}
      
      {/* Show error message if there's an error */}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      
      <h2 className="text-xl font-medium mb-2">Did you mean</h2>
      
      {/* Grid layout for displaying search results */}
      <div className="flex flex-wrap gap-4">
                {items.map((item) => (
                    <div key={item.itemId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <Link to={`/item/${item.itemId}`} className="block">
                            <div className="aspect-w-1 aspect-h-1">
                                <img src="/bike.jpg" alt={item.itemTitle} className="w-full h-full object-cover rounded-md mb-4" />
                            </div>
                            <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">${item.currentPrice}</p>
                                <Timer endTime={item.endDate}/>
                            </div>
                        </Link>
                    </div>
                ))}
                
            </div>
    </div>
  );
};

export default SearchPage;