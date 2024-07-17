import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Config
import api from '../config/api/loginApi';

// Models
import IUser from '../Models/IUser';

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<IUser | null>(null);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="relative">
                <img src="/bike.jpg" alt="Background" className="w-full h-96 object-cover" />
                <div className="absolute top-0 left-0 w-full h-96 bg-white opacity-50"></div>
            </div>

            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="lg:w-2/3 mb-8 lg:mb-0">
                        <h2 className="text-2xl font-semibold mb-4">Popular</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <img src="/bike.jpg" alt="Album Art" className="w-12 h-12 object-cover mr-4" />
                                    <div>
                                        <h3 className="text-lg font-medium">Item 1</h3>
                                        <p className="text-sm text-gray-500">1 Bid</p>
                                    </div>
                                </div>
                                <span className="text-gray-500">Timer</span>
                                <span className="text-gray-500">$100</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <img src="/bike.jpg" alt="Album Art" className="w-12 h-12 object-cover mr-4" />
                                    <div>
                                        <h3 className="text-lg font-medium">Item 1</h3>
                                        <p className="text-sm text-gray-500">1 Bid</p>
                                    </div>
                                </div>
                                <span className="text-gray-500">Timer</span>
                                <span className="text-gray-500">$100</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <img src="/bike.jpg" alt="Album Art" className="w-12 h-12 object-cover mr-4" />
                                    <div>
                                        <h3 className="text-lg font-medium">Item 1</h3>
                                        <p className="text-sm text-gray-500">1 Bid</p>
                                    </div>
                                </div>
                                <span className="text-gray-500">Timer</span>
                                <span className="text-gray-500">$100</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Seller </h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                            <img src="/bike.jpg" alt="Liked Song" className="w-12 h-12 object-cover mr-4" />
                            <div>
                                <h3 className="text-lg font-medium">{user?.username}</h3>
                                <p className="text-sm text-gray-500">Seller details go here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Recently Posted</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg">
                        <div className="aspect-w-1 aspect-h-1">
                            <img src="/bike.jpg" alt="Item" className="w-full h-full object-cover rounded-md mb-4" />
                        </div>
                        <h3 className="text-lg font-medium">Item 1</h3>
                        <p className="text-sm text-gray-500">$20</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg">
                        <div className="aspect-w-1 aspect-h-1">
                            <img src="/bike.jpg" alt="Item" className="w-full h-full object-cover rounded-md mb-4" />
                        </div>
                        <h3 className="text-lg font-medium">Item 2</h3>
                        <p className="text-sm text-gray-500">$10</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-4 rounded-lg shadow-lg">
                        <div className="aspect-w-1 aspect-h-1">
                            <img src="/bike.jpg" alt="Item" className="w-full h-full object-cover rounded-md mb-4" />
                        </div>
                        <h3 className="text-lg font-medium">Item 3</h3>
                        <p className="text-sm text-gray-500">$100</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
