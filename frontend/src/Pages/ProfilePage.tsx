// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { FaRegCircleUser } from "react-icons/fa6";

// Config
import api from '../config/api/loginApi';

// Interface
interface User {
    username: string;
    email: string;
    address?: string; // Optional property
    contactNum?: string; // Optional property
}

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch User
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = Cookies.get('access_token');

                const response: AxiosResponse<User> = await api.get(`/api/user/${username}`, 
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
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex flex-col items-center">
                    <FaRegCircleUser size={80} />
                    <h1 className="text-2xl font-semibold mb-2">{user?.username}</h1>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <label className="text-gray-600 w-full sm:w-1/3">Email:</label>
                        <span className="w-full sm:w-2/3">{user?.email}</span>
                        <button>Edit</button>
                    </div>
                    {user?.address && (
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <label className="text-gray-600 w-full sm:w-1/3">Address:</label>
                            <span className="w-full sm:w-2/3">{user.address}</span>
                            <button>Edit</button>
                        </div>
                    )}
                    {user?.contactNum && (
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <label className="text-gray-600 w-full sm:w-1/3">Contact Number:</label>
                            <span className="w-full sm:w-2/3">{user.contactNum}</span>
                            <button>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
