import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import MyBids from './Pages/MyBids';
import MyWatchlist from './Pages/MyWatchlist';
import MyItemListing from './Pages/MyItemListing';

import UserProfile from "./Pages/ProfilePage";
import UserEditProfile from "./Pages/ProfileEditPage";

import ItemPage from "./Pages/ItemPage";
import ItemCreatePage from "./Pages/ItemCreatePage"
import ItemEditPage from "./Pages/ItemEditPage"
import SearchPage from "./Pages/SearchPage"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Function to check authentication status
  const checkAuthentication = () => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      setAuthenticated(true);

      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        setUser(decodedToken.sub);
        
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

  return (
    
    <div className="max-h-screen flex flex-col">
      <BrowserRouter>
        <ToastContainer />
        <div className="flex flex-1">
          <HomeSidebar isAuth={authenticated} user={user} />
        <div className="flex flex-col flex-1">
          <Navbar isAuth={authenticated} />
          <main className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/my-bids" element={<MyBids />} />
              <Route path="/watchlist" element={<MyWatchlist />} />
              <Route path="/my-listings" element={<MyItemListing user={user} />} />
              <Route path="/user/:username" element={<UserProfile user={user} />} />
              <Route path="/user/edit/:username" element={<UserEditProfile />} />
              <Route path="/item/create" element={<ItemCreatePage user={user} />} />
              <Route path="/item/edit/:itemId" element={<ItemEditPage />} />
              <Route path="/item/:itemId" element={<ItemPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App
