import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import profileImage from "../assets/userIcon.png";

import ThemeChangerButton from "./ThemeChanger";
import websiteLogo from "../assets/Final logo.ico";
import NotificationSystem from "./NotificationSystem";

export default function AppNavBar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Redirect to /viewprofile
    navigate("/viewprofile");
  };

  const handleTitleClick = () => {
    // Redirect to /
    if (role === "admin") navigate("/admin");
    if (role === "client") navigate("/client");
    if (role === "agent") navigate("/agent");
    if (role === "manager") navigate("/manager");
  };

  const [role, setRole] = useState("");
  window.addEventListener("role", function (e) {
    setRole(e.detail.role);
  });

  useEffect(() => {
    const getRole = async () => {
      await axios
        .get("http://localhost:3000/api/v1/getRole", {
          withCredentials: true,
        })
        .then((res) => {
          setRole(res.data);
        });
    };
    getRole();
  }, []);

  return (
    <div className="navbar bg-transparent font-mono">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {role === "agent" ? (
              <li>
                <a onClick={() => navigate("/agent")}>Agent Dashboard</a>
              </li>
            ) : (
              <></>
            )}
            {role === "admin" ? (
              <>
              <li>
                <a onClick={() => navigate("/admin")}>Admin Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/agent")}>Agent Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/client")}>Client Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/manager")}>Manager Dashboard</a>
              </li>
              </>
            ) : (
              <></>
            )}
            {role === "client" ? (
              <li>
                <a onClick={() => navigate("/client")}>Client Dashboard</a>
              </li>
            ) : (
              <></>
            )}
            {role === "manager" ? (
              <li>
                <a onClick={() => navigate("/manager")}>Manager Dashboard</a>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center flex-col" onClick={handleTitleClick}>
        <img
          src={websiteLogo}
          alt="Website Logo"
          style={{ maxWidth: "100px", maxHeight: "40px" }}
          className=""
        />
        <a className="btn btn-ghost text-2xl text-opacity-100">Help Desk</a>
      </div>
      <div className="navbar-end">
        {<ThemeChangerButton />}

        {<NotificationSystem />}
        {/* Check if user is logged in */}
        {role ? (
          <div>
            <div
              className="avatar mx-2"
              onClick={handleProfileClick}
              style={{ top: 6 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <button
              className="btn btn-ghost text-lg"
              onClick={() => {
                navigate("/login");
                window.dispatchEvent(
                  new CustomEvent("role", { detail: { role: "" } })
                );
              }}
            >
              Logout
            </button>
            
          </div>
        ) : (
          <div >
            <button
              className="btn btn-ghost text-lg"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-ghost text-lg"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
