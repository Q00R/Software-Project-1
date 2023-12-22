// import '../public/styles/bootstrap.min.css'
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
import Knowledgebase from "./pages/Knowledgebase";
import Navbar from "./components/Navbar";
import ViewProfile from "./pages/viewProfile";
import profileImage from "./assets/userIcon.png";
import axios from "axios";
import ClientHome from "./pages/ClientHome";

import AgentDashboard from "./pages/AgentDashboard";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/isLoggedIn`,
          { withCredentials: true }
        );
        const { status, data } = response;
        console.log(data);
        setIsLoggedIn(data);
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);

  return  (
    <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa/:email" element={<MFA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
      </Routes>
      </div>
    </>
  );
}

export default App;