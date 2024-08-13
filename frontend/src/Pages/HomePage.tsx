import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Components
import AdPlacementCarousel from '../Components/AdPlacementCarousel';
import SurveyPopup from '../Components/Popup/SurveyPopup';

// Config
import ProductGrid from '../Components/Carousel/ProductGrid';
import api from './../config/api/loginApi';

interface AuthProps {
  isAuth?: boolean;
  user: string | null | undefined;
}

const HomePage: React.FC<AuthProps> = ({ user }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [interestChecked, setInterestCheck] = useState(true);
    const [showSurvey, setShowSurvey] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const accessToken = Cookies.get('access_token');
            if (accessToken) {
                setAuthenticated(true);
                await checkInterest();
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

        checkAuthentication();
    }, [user]);

    useEffect(() => {
        if (authenticated && !interestChecked) {
            setShowSurvey(true);
        }
    }, [authenticated, interestChecked]);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {showSurvey && <SurveyPopup username={user} onClose={() => setShowSurvey(false)} />}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <AdPlacementCarousel />
                <ProductGrid username={user} />
            </div>
        </div>
    );
};

export default HomePage;
