import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

let backend_url = "http://localhost:3000/api/v1";

const HomePage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']); // Replace 'token' with the actual name of your cookie
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if cookies or 'token' cookie is not available, then navigate to login
        if (!cookies || !cookies.token) {
          navigate("/login");
          return;
        }

        const uid = localStorage.getItem("userId");
        console.log(uid);

        const response = await axios.get(`${backend_url}/users/${uid}`, {
          withCredentials: true,
        });
        console.log("response", response);

        // Handle different status codes if needed
        if (response.status !== 200) {
          console.log('Status from home page:', response.status);
          // Handle other status codes, like unauthorized (401), etc.
          navigate('/login');
          return;
        }

        setUserName(response.data.displayName);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., navigate to login page
        navigate("/login");
      }
    };

    fetchData();
  }, [cookies, navigate]);

  return (
    <>
    </>
  );
};

export default HomePage;
