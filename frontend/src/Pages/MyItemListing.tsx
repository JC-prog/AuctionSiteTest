import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit, FiUpload } from 'react-icons/fi';

// Api Function Call
import { fetchItemsByUsername } from '../services/ItemService';

// Config
import api from '../config/api/loginApi';

// Interfaces
import IItem from '../interfaces/IItem';

interface AuthProps {
  isAuth: boolean;
  user: string;
}

interface ApiResponse {
  results: Item[]; 
}

// Utility
import Timer from '../Components/Timer';
import UserItemList from '../Components/List/UserItemList';

const ItemsTable: React.FC<AuthProps> = ({ isAuth, user }) => {
    const [items, setItems] = useState<IItem[]>([]);
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
            const items = await fetchItemsByUsername(query);
            
            console.log('Fetched items:', items);
            setItems(items);
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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">My Listings</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mb-2"
          onClick={navigateToCreateListing}
        >
          Create New Listing
        </button>

        <UserItemList listTitle='My Listings' items={items} />
      </div>
  );
};

export default ItemsTable;
