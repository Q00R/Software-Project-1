import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const user = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/getUser', { withCredentials: true });
      const { data } = response;
      console.log(response);
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    // Fetch users when the component mounts
    user();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  

  if (users) {
    return (
      <div>
        {/* Your ViewProfile component content goes here */}
        <h1>Welcome to your profile!</h1>
        <div className="card lg:card-side bg-base-100 kight-xl" style={{ marginLeft: "auto", marginRight: "auto", width: '90%' }}>
          <div className="card-body">
            <h2 className="card-title">Profile Information!</h2>
            <p className="text-xl">User ID: {users._id}</p>
            <p className="text-xl">User Name: {users.username} </p>
            <p className="text-xl">Email: {users.email} </p>
            <p className="text-xl">DOB: {users.DOB} </p>
            <p className="text-xl">Role: {users.role}</p>
            <p className="text-xl">Status: {users.status} </p>
          </div>
          <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
        </div>
      </div>
    );
  }

  // Placeholder content or loading spinner while checking login status
  return <div>Loading...</div>;
};

export default ViewProfile;
