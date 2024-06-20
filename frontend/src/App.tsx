import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import PageHeader from './Layout/PageHeader';

// Components

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import UserProfile from "./Pages/ProfilePage";
import ItemPage from "./Pages/ItemPage";
import ItemCreatePage from "./Pages/ItemCreatePage"
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
        setUser(decodedToken.sub || null);

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
        <PageHeader isAuth={ authenticated }/>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/search" element={ <SearchPage /> } />

          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />

          <Route path="/user/:userID" element={ <UserProfile /> } />

          <Route path="/item/create" element={ <ItemCreatePage />} />
          <Route path="/item/:itemID" element={ <ItemPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
