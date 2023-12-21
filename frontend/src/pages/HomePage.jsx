import { useEffect, useState } from "react";
import NavbarDefault from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
let backend_url = "http://localhost:3000/api/v1";

export default function HomePage() {
  // const navigate = useNavigate();
  // const [cookies] = useCookies([]);
  // const [userName, setUserName] = useState("");
  // useeffect to fetch username
  useEffect(() => {
    async function fetchData() {
      try {
        if (!cookies.token) {
          navigate("/login");
        }
        const uid = localStorage.getItem("userId");
        console.log(uid);

        const response = await axios.get(`${backend_url}/users/${uid}`, {
          withCredentials: true,
        });
        console.log("response", response);

        // if (!response.status == 200) {
        //   console.log('status from home page', response.status)

        //   removeCookies('token')
        //   navigate('/login')
        // }
        setUserName(response.data.displayName);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }

    fetchData();
  }, [cookies, navigate]);
  return (
    <>
     <NavbarDefault />
      
    </>
  );
}