import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Models
import User from '../interfaces/User';

// Components
import ItemList from '../Components/List/ItemList';
import UserItemExpiringCarousel from '../Components/Carousel/UserItemExpiringCarousel';
import UserItemSoldCarousel from '../Components/Carousel/UserItemSoldCarousel';
import UserItemListedCarousel from '../Components/Carousel/UserItemListedCarousel';


const items = [
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


const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    // Fetch User
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = Cookies.get('access_token');
                const response: AxiosResponse<User> = await api.get(`/api/user/${username}`, {
                    headers: { 'Authorization': 'Bearer ' + accessToken },
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

    // Fetch User Photo
    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await api.get(`/api/user/photo/${username}`, { responseType: 'arraybuffer' });
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUserImage(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch profile photo:', error);
            }
        };

        fetchProfilePhoto();
    }, [username]);

    // Fetch Banner Image
    useEffect(() => {
        const fetchBannerImage = async () => {
            try {
                const response = await api.get(`/api/user/banner/${username}`, { responseType: 'arraybuffer' });
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBannerImage(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Failed to fetch banner photo:', error);
            }
        };

        fetchBannerImage();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative">
                <img src={bannerImage || '/banner.jpeg'} alt="Background" className="w-full h-48 object-cover" />
                <div className="absolute top-0 left-0 w-full h-48 bg-white opacity-50"></div>
            </div>

            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <ItemList listTitle="Popular" items={items} />

                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Seller</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                            <img
                                src={userImage || '/upload-photo.png'}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{user?.username}</h3>
                                <p className="text-sm text-gray-500">{user?.accountType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UserItemListedCarousel username={username} />
            <UserItemExpiringCarousel username={username} />
            <UserItemSoldCarousel username={username} />
        </div>
    );
};

export default ProfilePage;
