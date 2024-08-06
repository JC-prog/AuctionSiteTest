import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Config
import api from './config/api/loginApi';

// Layouts
import PageHeader from './Layout/PageHeader';

// Components
import HomeSidebar from "./Components/Sidebar/HomeSidebar";
import Navbar from './Components/Navbar';

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

// Navigation Page
import MyWatchlist from './Pages/MyWatchlist';
import MyItemListing from './Pages/MyItemListing';

import UserProfile from "./Pages/ProfilePage";
import UserEditProfile from "./Pages/ProfileEditPage";

import ItemPage from "./Pages/ItemPage";
import ItemCreatePage from "./Pages/ItemCreatePage"
import ItemEditPage from "./Pages/ItemEditPage"
import SearchPage from "./Pages/SearchPage"
import AnalyticsPage from './Pages/AnalyticsPage';
import TransactionPage from './Pages/TransactionPage';
import FeedbackPage from './Pages/FeedbackPage';

// Admin Pages
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage';
import AdminUserManagementPage from './Pages/AdminPages/AdminUserManagementPage';
import AdminListingManagementPage from './Pages/AdminPages/AdminListingManagementPage';
import AdminSystemManagementPage from './Pages/AdminPages/AdminSystemManagementPage';
import AdminFeedbackManagementPage from './Pages/AdminPages/AdminFeedbackManagementPage';
import MyNotificationPage from './Pages/MyNotificationPage';
import MyBidsPage from './Pages/MyBids';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Function to check authentication status
  const checkAuthentication = async () => {
    const accessToken = await Cookies.get('access_token');
    if (accessToken) {
      setAuthenticated(true);

      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        setUser(decodedToken.sub);

        const response: AxiosResponse<String> = await api.get(`/api/user/get-role/${decodedToken.sub}`);

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        
        setUserRole(response.data);
        
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }

    } else {
      setAuthenticated(false);
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);


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

  return (
    
    <div className="max-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <div className="flex flex-1">
          <HomeSidebar isAuth={authenticated} user={user} role={userRole} />
        <div className="flex flex-col flex-1">
          <Navbar isAuth={authenticated} />
          <main className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage user={user}/>} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/user-management" element={<AdminUserManagementPage />} />
              <Route path="/admin/listing-management" element={<AdminListingManagementPage />} />
              <Route path="/admin/system-management" element={<AdminSystemManagementPage />} />
              <Route path="/admin/feedback-management" element={<AdminFeedbackManagementPage />} />

              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/notification" element={<MyNotificationPage user={user} />} />
              <Route path="/my-bids" element={<MyBidsPage user={user}/>} />
              <Route path="/watchlist" element={<MyWatchlist user={user}/>} />
              <Route path="/my-listings" element={<MyItemListing user={user} />} />
              <Route path="/user/:username" element={<UserProfile user={user} />} />
              <Route path="/user/edit/:username" element={<UserEditProfile />} />
              <Route path="/item/create" element={<ItemCreatePage user={user} />} />
              <Route path="/item/edit/:itemId" element={<ItemEditPage />} />
              <Route path="/item/:itemId" element={<ItemPage user={user} />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/transactions" element={<TransactionPage items={ items }/>} />
              <Route path="/feedback" element={<FeedbackPage user={user}/>} />
              
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App
