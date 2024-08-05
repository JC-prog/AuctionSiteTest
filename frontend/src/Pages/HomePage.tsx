import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Components
import ItemCarousel from "../Components/ItemCarousel"
import { ImageSlider } from '../Components/ImageSlider';
import CategoryBar from '../Components/CategoryBar';
import ItemCard from "../Components/ItemCard";
import Card from "../Components/Cards/ItemCard";
import ItemList from "../Components/ItemList";
import AdPlacementCarousel from '../Components/AdPlacementCarousel';

// Utilities Component
import Timer from '../Components/Timer';
import Spinner from '../Components/Interactive/Spinner';
import LikeButton from '../Components/Interactive/LikeButton';

// Config
import api from '../config/api/loginApi';
import ItemCardListHomeCarousel from '../Components/Carousel/ItemCardListHomeCarousel';

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

interface AuthProps {
    isAuth: boolean;
    user: string;
  }

const HomePage: React.FC<AuthProps> = ({ isAuth, user }) => {
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
        console.log(user);
      try {
        const response: AxiosResponse<PaginatedResponse> = await api.get(`/api/items/all`);

            console.log(response);

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

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <Spinner />;
}

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <AdPlacementCarousel />

          <ItemCardListHomeCarousel carouselTitle="Just For You" items={items} username={ user }/>

          <ItemCardListHomeCarousel carouselTitle="Recently Posted" items={items}/>
        
      </div>
    </div>
  )
}

export default HomePage