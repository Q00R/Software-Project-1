// import '../public/styles/bootstrap.min.css'
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
  ManagerDashboard,
  viewProfile,
} from "./pages";
import "./index.css"; // Import your CSS file
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {

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

       
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/client" element={<ClientHome />} />
      </Routes>
      <Footer />
      </div>
    
    </>
  );
}

export default App;
