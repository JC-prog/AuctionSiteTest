import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Components
import ItemCarousel from "../Components/ItemCarousel"
import { ImageSlider } from '../Components/ImageSlider';
import CategoryBar from '../Components/CategoryBar';
import ItemCard from "../Components/ItemCard";
import Card from "../Components/Cards/ItemCard";
import ItemList from "../Components/ItemList";
import AdPlacementCarousel from '../Components/AdPlacementCarousel';

import Timer from '../Components/Timer';

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

  const navigateToItem = () => {

    navigate(`/item/${ item.itemId }`)

}

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <AdPlacementCarousel />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Just For You</h2>
            <div className="flex flex-wrap gap-4">
              {items.map(item => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                     <div className="aspect-w-1 aspect-h-1">
                            <img src="/test.jpg" alt="Item" className="w-full h-full object-cover rounded-md mb-4" />
                      </div>
                    <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                    <Timer endTime={item.endDate} />
                    <p className="text-sm text-gray-400">${item.currentPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
        </div>

        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recently Posted</h2>
            <div className="flex flex-wrap gap-4">
              {items.map(item => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                     <div className="aspect-w-1 aspect-h-1">
                            <img src="/test.jpg" alt="Item" className="w-full h-full object-cover rounded-md mb-4" />
                      </div>
                    <h3 className="text-lg font-medium">{item.itemTitle}</h3>
                    <Timer endTime={item.endDate} />
                    <p className="text-sm text-gray-400">${item.currentPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
        </div>
              
      </div>
    </div>
  )
}

export default HomePage