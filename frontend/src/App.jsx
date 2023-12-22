// import '../public/styles/bootstrap.min.css'
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
import Knowledgebase from "./pages/Knowledgebase";
import './index.css'; // Import your CSS file
import { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import axios from 'axios';
import Navbar from "./components/Navbar";
>>>>>>> fab448e8613b56b10580b163374bfac814d081b2

import AgentDashboard from "./pages/AgentDashboard";

function App() {
  const location = useLocation();
  const [update, setUpdate] = useState(false);

  console.log(location.pathname); // result: '/secondpage'

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    setUpdate(!update);
  }, [location]);

  return (
    <>
      <Navbar/>
      <div style={{ position: 'fixed', width: '100%', height: '93%', top: '7%', left: 0 }}>
        {
          location.pathname === '/' ?
            <Homepage />:
          location.pathname === '/login' ?
            <Login />:
          location.pathname === '/register' ?
            <Register />:
          location.pathname === '/knowledgebase' ?
            <Knowledgebase />:
          location.pathname === '/mfa/:email' ?
            <MFA />:
          location.pathname === '/admin' ?
            <Admin />:
          null
        }
      </div>
    </>
  );
}

export default App;