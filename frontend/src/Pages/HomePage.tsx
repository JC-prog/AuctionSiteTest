import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Components
import ItemCarousel from "../Components/ItemCarousel"

// Config
import api from '../config/api/loginApi';

// Interface
interface Item {
  itemId: number;
  itemTitle: string;
  itemCategoryNum: number;
  minSellPrice: number;
}

interface Items {
  items: Items[];
}

const HomePage = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response: AxiosResponse<Items[]> = await api.get(`/items}`);

            if (response.status !== 200) {
            throw new Error('Network response was not ok');
            }
            
            setItems(response.data);

        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    fetchItems();
  }, []);

  return (
    <div>
        <ItemCarousel />
        <ItemCarousel />
    </div>
  )
}

export default HomePage