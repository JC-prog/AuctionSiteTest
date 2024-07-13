// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { FaRegCircleUser } from "react-icons/fa6";

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

    // Navigation
    const redirectToEditProfile = () => {
        if (user) {
          navigate(`/user/edit/${user.username}`);
        }
      };

    return (
        <div className="m-20 grid gap-4 sm:grid-cols-2 sm:grid-rows-2">
            <div className="min-h-[100px] rounded-lg shadow sm:col-span-1 p-4">
                <div>
                    <img className="w-full h-auto rounded-md" src="/upload-photo.png" alt="Upload Photo" />
                </div>

                <div>
                    <p>{ user?.username }</p>
                    <p>4 Stars</p>
                    <p>100 Items Sold</p>
                </div>

                <div>
                    <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={ redirectToEditProfile }>
                        Edit Profile
                    </button>
                </div>

            </div>

            <div className="my-20 p-2 rounded-lg shadow bg-gray-100 sm:col-span-1 grid gap-2 sm:grid-cols-3">
                <div>
                    About
                </div>

                <div>
                    Listings
                </div>

                <div>
                    Reviews
                </div>

                <div>
                    Bicycle 1
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
