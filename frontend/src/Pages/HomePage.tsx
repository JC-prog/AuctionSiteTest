import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Components
import ItemCarousel from "../Components/ItemCarousel"
import { ImageSlider } from '../Components/ImageSlider';
import CategoryBar from '../Components/CategoryBar';
import ItemCard from "../Components/ItemCard";

// Config
import api from '../config/api/loginApi';


interface Item {
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

const HomePage = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response: AxiosResponse<PaginatedResponse> = await api.get(`/api/items/all`);

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

    fetchItems();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">Recently Posted</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {items.map(item => (
            <ItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage