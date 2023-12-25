// import '../public/styles/bootstrap.min.css'
import "./index.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/AdminDashboard";
import Knowledgebase from "./pages/Knowledgebase";
import AgentDashboard from "./pages/AgentDashboard";
import ViewProfile from "./pages/ViewProfile";
import ClientHome from "./pages/ClientHome";
import './index.css'; // Import your CSS file
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/knowledgebase" element={<Knowledgebase />} />
        <Route path="/client" element={<ClientHome />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;