import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Config
import api from './config/api/loginApi';

// Layouts

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

import ItemPage from "./Pages/ItemPage";
import ItemCreatePage from "./Pages/ItemCreatePage"
import ItemEditPage from "./Pages/ItemEditPage"
import SearchPageKeyword from "./Pages/SearchPageKeyword"
import SearchPageCategory from "./Pages/SearchPageCategory"
import AnalyticsPage from './Pages/AnalyticsPage';
import TransactionPage from './Pages/TransactionPage';
import FeedbackPage from './Pages/FeedbackPage';
import MyNotificationPage from './Pages/MyNotificationPage';
import MyBidsPage from './Pages/MyBids';
import TradeRequestPage from './Pages/TradeRequestPage';

// Admin Pages
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage';
import AdminUserManagementPage from './Pages/AdminPages/AdminUserManagementPage';
import AdminListingManagementPage from './Pages/AdminPages/AdminListingManagementPage';
import AdminSystemManagementPage from './Pages/AdminPages/AdminSystemManagementPage';
import AdminFeedbackManagementPage from './Pages/AdminPages/AdminFeedbackManagementPage';

// User Pages
import UserProfile from "./Pages/ProfilePage";
import UserEditProfile from "./Pages/ProfileEditPage";
import UserListedItemsPage from './Pages/UserItemPage/UserListedItemsPage';
import UserExpiringItemsPage from './Pages/UserItemPage/UserExpiringtemsPage';
import UserSoldItemsPage from './Pages/UserItemPage/UserSoldtemsPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null | undefined>();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [interestChecked, setInterestCheck] = useState(true);

  // Function to check authentication status
  const checkAuthentication = async () => {
    const accessToken = await Cookies.get('access_token');
    if (accessToken) {
      setAuthenticated(true);
      setInterestCheck(false);

      try {
        const decodedToken = jwtDecode(accessToken);
        setUser(decodedToken.sub);

        const response = await api.get(`/api/user/get-role/${decodedToken.sub}`);

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

  const checkInterest = async() => {

    if(authenticated)
    {
        
      try {
        const response = await api.get(`/api/user/interest/${user}`);
        console.log(response);
        setInterestCheck(response.data);
        
    } catch (error) {
        console.error('Error decoding token:', error);
        setInterestCheck(true);
    }

  }
}

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthentication();
    checkInterest();
    console.log("Authenticated: " + authenticated)
    console.log("Interest Check: " + interestChecked)
  }, []);

  return (
    
    <div className="max-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <div className="flex flex-1">
          <HomeSidebar isAuth={authenticated} user={user} role={userRole} />
        <div className="flex flex-col flex-1">
          <Navbar isAuth={authenticated} user={user}/>
          <main className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/user-management" element={<AdminUserManagementPage />} />
              <Route path="/admin/listing-management" element={<AdminListingManagementPage />} />
              <Route path="/admin/system-management" element={<AdminSystemManagementPage />} />
              <Route path="/admin/feedback-management" element={<AdminFeedbackManagementPage />} />

              <Route path="/search" element={<SearchPageKeyword user={user}/>} />
              <Route path="/category-search" element={<SearchPageCategory user={user}/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/notification" element={<MyNotificationPage user={user} />} />
              <Route path="/my-bids" element={<MyBidsPage user={user}/>} />
              <Route path="/watchlist" element={<MyWatchlist user={user}/>} />
              <Route path="/my-listings" element={<MyItemListing user={user} />} />
              <Route path="/my-trade" element={<TradeRequestPage user={user} />} />

              {/* User pages */}
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/user/edit/:username" element={<UserEditProfile />} />
              <Route path="/user/listed-items/:username" element={<UserListedItemsPage/>} />
              <Route path="/user/expiring-items/:username" element={<UserExpiringItemsPage/>} />
              <Route path="/user/sold-items/:username" element={<UserSoldItemsPage/>} />

              {/* Item Pages */}
              <Route path="/item/create" element={<ItemCreatePage user={user} />} />
              <Route path="/item/edit/:itemId" element={<ItemEditPage user={user}/>} />
              <Route path="/item/:itemId" element={<ItemPage isAuth={authenticated} user={user} />} />
              <Route path="/subscription" element={<AnalyticsPage />} />
              <Route path="/transactions" element={<TransactionPage user={user}/>} />
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
