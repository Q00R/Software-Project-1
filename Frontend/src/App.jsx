import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// import '../public/styles/bootstrap.min.css'
import { Route  , Router, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/register";
import MFA from "./pages/MFA";
function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/mfa/:email" element={<MFA/>}/>
          
          <Route path="/" element={<Homepage />} />


        </Routes>
    </>
  );
}

export default App;