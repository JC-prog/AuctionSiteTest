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
import ProductGrid from '../Components/Carousel/ProductGrid';

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
  const [showSurvey, setShowSurvey] = useState<boolean>(!interestChecked);

  useEffect(() => {
    console.log("Interest Check: " + interestChecked)
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {showSurvey && <SurveyPopup username={user} onClose={() => setShowSurvey(false)} />}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <AdPlacementCarousel />
        <ProductGrid  username={user}/>
        
      </div>
    </div>
  );
};

export default HomePage;
