import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AxiosResponse } from 'axios';
import { terminal } from 'virtual:terminal';

// Styles
import "../Styles/ProfilePage.scss";

// Components
import ProfileComponent from '../Components/ProfileComponent';

// Config
import api from '../config/api/loginApi';

// Interface
interface User {
    userName: string;
    userPassword: string;
    userNumber: string;
    userAddress: string;
    userEmail: string;
    isActive: boolean;
    isAdmin: boolean;
}



const ProfilePage: React.FC = () => {
    const { userID } = useParams<{ userID: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch User
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response: AxiosResponse<User> = await api.get(`/api/user/${userID}`);

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
      }, [userID]);
    
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
                        <h1>{ user.userName }</h1>
                    </div>

                    <div className="profile-navigation-link">
                        <h2>Profile</h2>
                    </div>

                    <div  className="profile-navigation-link">
                        <h2>Selling</h2>
                    </div>

                    <div  className="profile-navigation-link">
                        <h2>Bidding</h2>
                    </div>

                    <div  className="profile-navigation-link">
                        <h2>Feedback</h2>
                    </div>

                </div>

                <div className= "profile-content-container">
                    <ProfileComponent user= { user } />
                </div>
            </div>
            

          ) : (
            <div>User not found</div>
          )}

          
        </div>
    );
};

export default ProfilePage