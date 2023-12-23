// import '../public/styles/bootstrap.min.css'
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
import Navbar from "./components/Navbar";

import AgentDashboard from "./pages/AgentDashboard";

function App() {

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
      </div>
    </>
  );
}

export default App;