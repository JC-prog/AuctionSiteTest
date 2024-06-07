import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";


// Components
import Navbar from "./Components/Navbar";
import Menubar from "./Components/Menubar";

// Pages
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import UserProfile from "./Pages/ProfilePage";

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Menubar />
        <Routes>

          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />

          <Route path="/:userId" element={ <UserProfile /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
