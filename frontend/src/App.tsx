import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./Components/Navbar";
import Menubar from "./Components/Menubar";

// Pages
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import UserProfile from "./Pages/ProfilePage";
import ItemPage from "./Pages/ItemPage";
import ItemCreatePage from "./Pages/ItemCreatePage"
import SearchPage from "./Pages/SearchPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
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
    </>
  )
}

export default App
