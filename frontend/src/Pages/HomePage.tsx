import React, { useEffect, useState } from 'react';

// Components
import AdPlacementCarousel from '../Components/AdPlacementCarousel';
import SurveyPopup from '../Components/Popup/SurveyPopup';

// Config
import ProductGrid from '../Components/Carousel/ProductGrid';


interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
  interestChecked: boolean;
}

const HomePage: React.FC<AuthProps> = ({ user, interestChecked }) => {
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
