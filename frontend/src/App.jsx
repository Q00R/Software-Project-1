// import '../public/styles/bootstrap.min.css'
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";
import AgentDashboard from "./pages/AgentDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa/:email" element={<MFA />} />
        <Route path= "/agents" element= {<AgentDashboard />} />
      </Routes>
    </>
  );
}

export default App;
