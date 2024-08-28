import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Components
import AdPlacementCarousel from '../Components/AdPlacementCarousel';
import SurveyPopup from '../Components/Popup/SurveyPopup';

// Config
import HomeProductCategoryGrid from '../Components/Carousel/HomeProductCategoryGrid';
import api from './../config/api/loginApi';
import { fetchUserCategoryPreference } from '../services/UserPreferenceService';
import ProductGridJustForYou from '../Components/Carousel/ProductGridJustForYou';

interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const HomePage: React.FC<AuthProps> = ({ user }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [interestChecked, setInterestCheck] = useState(true);
  const [showSurvey, setShowSurvey] = useState<boolean>(false);
  const [userCatPreference, setUserCatPreference] = useState<any[]>([]); 
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        setAuthenticated(true);
        await checkInterest();
        await getPreference();
      } else {
        setAuthenticated(false);
      }
    };

    const checkInterest = async () => {
      try {
        const response = await api.get(`/api/user/interest/${user}`);
        setInterestCheck(response.data);
      } catch (error) {
        console.error('Error checking interest:', error);
        setInterestCheck(true);
      }
    };

    const getPreference = async () => {
      setLoadingPreferences(true);
      try {
        const response = await fetchUserCategoryPreference(user);
        if (response.data && response.data.length > 0) {
          setUserCatPreference(response.data);
        } else {
          console.warn('Empty or invalid user preferences received');
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      } finally {
        setLoadingPreferences(false);
      }
    };

    checkAuthentication();

    console.log("User Logged In: " + user);
    console.log("User Authenticated: " + authenticated);
    console.log("User Preference: " + userCatPreference);
  }, [user]);

  useEffect(() => {
    if (authenticated && !interestChecked) {
      setShowSurvey(true);
    }
  }, [authenticated, interestChecked]);

  const generateCategory = () => {
    return userCatPreference.slice(0, 5).map((category, index) => (
      <HomeProductCategoryGrid key={index} username={user} category={category} />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <AdPlacementCarousel />

        {authenticated ? (
          <>
            {showSurvey && <SurveyPopup username={user} onClose={() => setShowSurvey(false)} />}
            {loadingPreferences ? (
              <p>Loading preferences...</p>
            ) : (
              <>
                {userCatPreference.length > 0 ? (
                  <>
                    <ProductGridJustForYou username={user} />
                    {generateCategory()}
                  </>
                ) : (
                  <>
                    <HomeProductCategoryGrid username={user} category="Sports" />
                    <HomeProductCategoryGrid username={user} category="Arts" />
                    <HomeProductCategoryGrid username={user} category="Electronics" />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <HomeProductCategoryGrid username={user} category="Sports" />
            <HomeProductCategoryGrid username={user} category="Arts" />
            <HomeProductCategoryGrid username={user} category="Electronics" />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
