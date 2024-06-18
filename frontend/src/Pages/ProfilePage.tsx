import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Icons
import { FaRegUser } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";

// Styles
import "../Styles/ProfilePage.scss";

// Components
import ProfileComponent from '../Components/ProfileComponent';

// Config
import api from '../config/api/loginApi';

// Interface
interface User {
    username: string;
    email: string;
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

            const response: AxiosResponse<User> = await api.get(`/api/user/User9`, 
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
        <div>
          {user ? (
            <div className= "profile-page-container">
                <div className= "profile-navigation-container">
                    <div className="profile-navigation-link">
                        <h1>{ user.username }</h1>
                    </div>

                    <div className="profile-navigation-link">
                        <FaRegUser />
                        <h2>Profile</h2>
                    </div>

                    <div className="profile-navigation-link">
                        <GoTag />
                        <h2>Selling</h2>
                    </div>

                    <div  className="profile-navigation-link">
                        <HiOutlineShoppingCart />
                        <h2>Bidding</h2>
                    </div>

                    <div  className="profile-navigation-link">
                        <FaRegComment />
                        <h2>Feedback</h2>
                    </div>

                </div>

                <div className= "profile-content-container">
                    
                </div>
            </div>
            

          ) : (
            <div>User not found</div>
          )}

          
        </div>
    );
};

export default ProfilePage