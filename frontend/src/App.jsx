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
      <Navbar />
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "93%",
          top: "7%",
          left: 0,
          overflow: "scroll",
        }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa/:email" element={<MFA />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
