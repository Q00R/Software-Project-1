// import '../public/styles/bootstrap.min.css'
import "./index.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import Admin from "./pages/adminDashboard";
//import ChatsPage from "./pages/ChatsPage";
import Knowledgebase from "./pages/Knowledgebase";
import AgentDashboard from "./pages/AgentDashboard";
import ViewProfile from "./pages/viewProfile";
import ClientHome from "./pages/ClientHome";
import Messenger from "./pages/messenger/Messenger"
import './index.css'; // Import your CSS file
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import AboutUs from "./components/AboutUs";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch("http://localhost:3000/api/v1/getRole", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status === 200) { return; }
      const data = await res.json();
      console.log(data, res.status);
      navigate('/login');
    };
    checkLoggedIn();
  }, []);

  return (
    <main>
      <section>
        <Navbar />
      </section>
      <section>
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
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}

export default App;
