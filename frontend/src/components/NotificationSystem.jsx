import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Import the bell icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotificationSystem() {
  const notify = () => {
    toast("cool notif", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <button onClick={notify}><FaBell/></button>
      <ToastContainer />
    </div>
  );
}
  
  export default NotificationSystem;