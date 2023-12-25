import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import profileImage from "../assets/userIcon.png";
import FancyButton from "./Button";
import ThemeChangerButton from "./ThemeChanger";

export default function AppNavBar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Redirect to /viewprofile
    navigate("/viewprofile");
  };

  const handleTitleClick = () => {
    // Redirect to /
    navigate("/");
  };
  
  const [role, setRole] = useState("");
  window.addEventListener("role", function (e) {
    setRole(e.detail.role);
  });

  return (
    <div className="navbar bg-transparent">
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
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center" onClick={handleTitleClick}>
        <a className="btn btn-ghost text-xl text-opacity-100">Help Desk</a>
      </div>
      <div className="navbar-end">
        {<ThemeChangerButton />}

        <label
          className="flex cursor-pointer gap-2"
          style={{ marginRight: "10px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* Check if user is logged in */}
        {role ? (
          <div>
            <div className="avatar" onClick={handleProfileClick}>
              <div className="w-9 rounded-full">
                <img src={profileImage} alt="profile" />
              </div>
            </div>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => {
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : 
        <div style={{justifyContent: 'space-between'}}>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>}
      </div>
    </div>
  );
}
