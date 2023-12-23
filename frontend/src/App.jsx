// import '../public/styles/bootstrap.min.css'
import { useEffect, useState  } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
import ChatApp from "./pages/ChatApp"
import Knowledgebase from "./pages/Knowledgebase";
import Navbar from "./components/Navbar";
import ViewProfile from "./pages/viewProfile";
import profileImage from "./assets/userIcon.png";
import axios from "axios";
import ClientHome from "./pages/ClientHome";
import AgentDashboard from "./pages/AgentDashboard";

function App() {

  

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
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </>
  );
}

export default App;