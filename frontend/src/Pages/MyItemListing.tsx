import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

// Config
import api from '../config/api/loginApi';

// Example data for items (replace with actual data or fetch from API)
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

interface AuthProps {
  isAuth: boolean;
  user: string;
}

interface ApiResponse {
  results: Item[]; // Adjusted according to your description
}

const ItemsTable: React.FC<AuthProps> = ({ isAuth, user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const query = user;
  const navigate = useNavigate();

  // Navigate to Create Listing Page
  const navigateToCreateListing = () => {
    navigate('/item/create');
  };

  const navigateToEditListing = () => {
    navigate('/item/edit');
  };

  // Get items by seller
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        console.log(`Fetching items for user: ${query}`);
        const response = await api.get<ApiResponse>(`/api/items/seller?sellerName=${query}`); 
        
        console.log('API response:', response);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        console.log('Fetched items:', response.data);
        
        setItems(response.data)

        console.log(items)
      } catch (error) {
        console.error('Error fetching items:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mb-2"
          onClick={navigateToCreateListing}
        >
          Create New Listing
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Item ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Item Title
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Item Price
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200"></th> {/* Empty cell for Edit button */}
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.itemId}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.itemId}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item.itemTitle}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">${item.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 focus:outline-none">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
