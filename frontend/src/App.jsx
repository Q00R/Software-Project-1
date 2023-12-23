// import '../public/styles/bootstrap.min.css'
import { useEffect, useState  } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
import Knowledgebase from "./pages/Knowledgebase";
import Navbar from "./components/Navbar";
import ViewProfile from "./pages/viewProfile";
import ClientHome from "./pages/ClientHome";
import AgentDashboard from "./pages/AgentDashboard";
import Footer from "./components/Footer";
function App() {
  
  return  (
    <>
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
    </>
  );
}

export default App;