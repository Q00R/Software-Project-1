// import '../public/styles/bootstrap.min.css'
<<<<<<< HEAD
import { Router, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
import Knowledgebase from "./pages/Knowledgebase";
import './index.css'; // Import your CSS file
import { useState, useEffect } from 'react';
import axios from 'axios';
=======
import { useEffect, useState  } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  HomePage,
  Login,
  Register,
  MFA,
  Admin,
  Knowledgebase,
  AgentDashboard,
  ClientHome,
  TrySearchParams,
  viewProfile,
} from "./pages";
import "./index.css"; // Import your CSS file
>>>>>>> 59812724487e4f6886b7a13bc21c48867e65ff6c
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
<<<<<<< HEAD

  return (
    <>
    <div style={{ position: 'fixed', width: '100%', height: '93%', top: '7%', left: 0 }}>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/knowledgebase" element={<Knowledgebase/>}/>
          <Route path="/mfa/:email" element={<MFA/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
=======

  const [update, setUpdate] = useState(false);
  

  console.log(location.pathname); // result: '/secondpage'

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    setUpdate(!update);
  }, [location]);

  return (
    <>
    <div
        style={{
          position: "fixed",
          width: "100%",
          height: "93%",
          top: "7%",
          left: 0,
          overflow: "scroll",
        }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa/:email" element={<MFA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewProfile" element={<viewProfile />} />
        <Route path="/agent" element={<AgentDashboard />} />
        <Route path="/client" element={<ClientHome />} />
      </Routes>
      <Footer />
>>>>>>> 59812724487e4f6886b7a13bc21c48867e65ff6c
      </div>
    
    </>
  );
}

export default App;
