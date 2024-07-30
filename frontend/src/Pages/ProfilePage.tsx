import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Models
import IUser from '../interfaces/IUser';
import IItem from '../interfaces/IItem';

// Components
import ItemCardListCarousel from '../Components/Carousel/ItemCardListCarousel';
import ItemCardListCarouselWithTimer from '../Components/Carousel/ItemCardListCarouselWithTimer';
import ItemList from '../Components/List/ItemList';

const items: Item[] = [
    {
        itemId: 1,
        image: '/bike.jpg',
        title: 'Bike',
        price: 20,
    },
    {
        itemId: 2,
        image: '/bike.jpg',
        title: 'Laptop',
        price: 500,
    },
    // Add more items here
];

interface PaginatedResponse {
    content: IItem[];
    // Add other pagination properties if needed
  }

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<IUser | null>(null);

    const [recentItems, setRecentItems] = useState<IItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    // Fetch User
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = Cookies.get('access_token');

                const response: AxiosResponse<IUser> = await api.get(`/api/user/${username}`, 
                    { 
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        } 
                    });

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setUser(response.data);

            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    // Fetch Items
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response: AxiosResponse<PaginatedResponse> = await api.get(`/sortedByDuration`);
    
                if (response.status !== 200) {
                throw new Error('Network response was not ok');
                }
                
                setRecentItems(response.data.content);
    
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchItems();
      }, []);

    // Fetch Top Items


    // Fetch Recent Items


    // State Handling
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative">
                <img src="/bike.jpg" alt="Background" className="w-full h-96 object-cover" />
                <div className="absolute top-0 left-0 w-full h-96 bg-white opacity-50"></div>
            </div>

            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:space-x-8">

                    <ItemList listTitle="Popular" items={items} />

                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Seller </h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                            <img src="/bike.jpg" alt="Liked Song" className="w-12 h-12 object-cover mr-4" />
                            <div>
                                <h3 className="text-lg font-medium">{user?.username}</h3>
                                <p className="text-sm text-gray-500">{user?.accountType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ItemCardListCarouselWithTimer carouselTitle="Expiring Soon" items={items}/>

            <ItemCardListCarouselWithTimer carouselTitle="Recently Posted" items={recentItems}/>

           <ItemCardListCarousel carouselTitle="Recently Sold" items={items}/>

            
        </div>
    );
};

export default ProfilePage;
