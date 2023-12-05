import "../stylesheets/auth.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
let backend_url = "http://localhost:3000/api/v1";
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    DOB: "",
    name: "",
    address: "",
  });
  const [successMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password, username, DOB, name, address } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/register`,
        {
          ...inputValue,
          displayName:username,
          role: "client",
        },
        { withCredentials: true }
      );
      const { status, data } = response;
      if (status == 201) {
        // handleSuccess(message);
        setSucessMessage("SignUp successfuly");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrorMessage(message);

      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
      DOB: "",
      name: "",
      address: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="DOB">DOB</label>
          <input
            type="text"
            name="DOB"
            value={DOB}
            placeholder="Enter your DOB"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="address">address</label>
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Enter your address"
            onChange={handleOnChange}
          />
        </div>
          
        <button type="submit">Submit</button>
        <span>
          {errorMessage} {successMessage}
        </span>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>33
        </span>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Signup;
