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

const HomePage: React.FC<AuthProps> = ({ isAuth, user }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [interestChecked, setInterestCheck] = useState(true);
    const [showSurvey, setShowSurvey] = useState<boolean>(false);
    const [userCatPreference, setUserCatPreference] = useState<any[]>([]); 

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
                console.log(response);
                setInterestCheck(response.data);
            } catch (error) {
                console.error('Error checking interest:', error);
                setInterestCheck(true);
            }
        };

        const getPreference = async () => {
            try {
                const response = await fetchUserCategoryPreference(user);
                console.log(response);
                setUserCatPreference(response.data);
            } catch (error) {
                console.error('Error fetching user preferences:', error);
            }
        }

        checkAuthentication();
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
    }
    
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <AdPlacementCarousel />
    
                {isAuth ? (
                    <>
                        {showSurvey && <SurveyPopup username={user} onClose={() => setShowSurvey(false)} />}
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
            </div>
        </div>
    );
};

export default HomePage;
