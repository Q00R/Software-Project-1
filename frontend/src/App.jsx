// import '../public/styles/bootstrap.min.css'
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
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
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";


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
      <Navbar />
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "93%",
          top: "7%",
          left: 0,
          overflow: "scroll",
        }}
      >
        {location.pathname === "/" ? (
          <HomePage />
        ) : location.pathname === "/login" ? (
          <Login />
        ) : location.pathname === "/register" ? (
          <Register />
        ) : location.pathname === "/knowledgebase" ? (
          <Knowledgebase />
        ) : location.pathname === "/mfa/:email" ? (
          <MFA />
        ) : location.pathname === "/admin" ? (
          <Admin />
        )  : location.pathname === "/client" ? (
          <ClientHome />
        )  : location.pathname === "/agent" ? (
          <AgentDashboard />
        ): null}
      </div>
      {/* <div
        style={{
          position: "fixed",
          width: "100%",
          height: "93%",
          top: "7%",
          left: 0,
          overflow: "scroll",
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/knowledgebase" element={<Knowledgebase />} />
          <Route path="/mfa/:email" element={<MFA />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/client" element={<ClientHome />} />
        </Routes>
      </div> */}
    </>
  );
}

export default App;
