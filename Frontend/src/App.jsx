import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route  , Router, Routes } from "react-router-dom";

import Signup from "./pages/register";

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      
    </Routes>
</>
  )
}

export default App
