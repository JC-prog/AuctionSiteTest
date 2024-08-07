import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from 'axios';

// Components
import AdPlacementCarousel from '../Components/AdPlacementCarousel';
import SurveyPopup from '../Components/Popup/SurveyPopup';

// Utilities Component
import Spinner from '../Components/Interactive/Spinner';

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
  interestChecked: boolean;
}

const HomePage: React.FC<AuthProps> = ({ isAuth, user, interestChecked }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showSurvey, setShowSurvey] = useState<boolean>(!interestChecked);

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
  }, [user]);

  const navigateToItem = (item: Item) => {
    navigate(`/item/${item.itemId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {showSurvey && <SurveyPopup onClose={() => setShowSurvey(false)} />}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <AdPlacementCarousel />
        <ItemCardListHomeCarousel carouselTitle="Just For You" items={items} username={user} />
        <ItemCardListHomeCarousel carouselTitle="Recently Posted" items={items} />
      </div>
    </div>
  );
};

export default HomePage;
