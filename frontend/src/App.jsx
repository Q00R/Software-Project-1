// import '../public/styles/bootstrap.min.css'
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MFA from "./pages/MFA";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mfa/:email" element={<MFA />} />
      </Routes>
    </>
  );
}

export default App;
