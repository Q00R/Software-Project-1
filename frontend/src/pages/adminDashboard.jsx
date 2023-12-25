import { useEffect, useState } from 'react';
import axios from 'axios';
// import the app.css file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/viewAllUsers', { withCredentials: true });
      const { data } = response;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
    {users.map((user) => (
      <div key={user._id} className="mb-4 ml-4 w-3/4">
        <div className="card w-full bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title text-lg">User</h2>
            {/* Use text-lg or other text size classes as needed */}
            <p className="text-xl">User ID: {user._id}</p>
            {/* Adjust the text size based on your preference, e.g., text-xl, text-lg, etc. */}
            <p className="text-xl">User Name: {user.username} </p>
            <p className="text-xl">Email: {user.email} </p>
            <p className="text-xl">DOB: {user.DOB} </p>
            <p className="text-xl">Role: {user.role}</p>
            <p className="text-xl">Status: {user.status} </p>
          
          <div className="card-actions justify-end">
            <button className="btn">Buy Now</button>
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  
    // <div>
    //   <h1>Admin Dashboard</h1>
    //   <ul className="user-list">
    //     {users.map((user) => (
    //       <li key={user._id}>
    //         <p>User Name: {user.username} </p>
    //         <p>Email: {user.email} </p>
    //         <p>DOB: {user.DOB} </p>
    //         <p>Role: {user.role}</p>
    //         <p>Status: {user.status} </p>
    //         <br></br>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );  
};

export default AdminDashboard;
