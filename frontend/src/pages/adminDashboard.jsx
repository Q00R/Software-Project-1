import { useEffect, useState } from "react";
import axios from "axios";
// import the app.css file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/viewAllUsers",
        { withCredentials: true }
      );
      const { data } = response;
      data.forEach((user) => {
        const dob = new Date(user.DOB);
        user.DOB = `${dob.getFullYear()}/${dob.getMonth()}/${dob.getDate()}`;
      });
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const changeRole = async (userId, newRole) => {
    try {
      const response = await axios.put("http://localhost:3000/admin/changeRole", {userId: userId, newRole: newRole}, { withCredentials: true });
      const { data } = response;
      if(response.status == 200){
        fetchUsers();
      }else{
        console.error('Failed to change role:', data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    // ... (other imports and component code)

<>
  <div key="users" className="grid grid-cols-3 gap-4">
    {users.map((user, i) => (
      <div className={`max-w-md shadow-md rounded-md overflow-hidden`} key={i}>
        <div className="p-4">
          <h1 className="font-bold text-xl mb-2">{user.username}</h1>
          <p className="text-gray-600 mb-2">Role: {user.role}</p>
          <p className="text-gray-600 mb-2">User ID: {user._id}</p>
          <p className="text-gray-600 mb-2">Email: {user.email}</p>
          <p className="text-gray-600 mb-2">DOB: {user.DOB}</p>
          <p className="text-gray-600 mb-2">Status: {user.status}</p>
        </div>
        <div className="p-4 bg-gray-400">
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-${user.role.toLowerCase()} rounded-full w-20 h-8 justify-center items-center`}
            >
              {user.role}
            </div>
            <ul tabIndex={0} className="text-gray-600 mb-2 dropdown-content z-[1] menu p-2 shadow bg-gray-400 rounded-box w-40">
              <li>
                <a onClick={() => changeRole(user._id, "admin")}>Admin</a>
              </li>
              <li>
                <a onClick={() => changeRole(user._id, "agent")}>Agent</a>
              </li>
              <li>
                <a onClick={() => changeRole(user._id, "manager")}>Manager</a>
              </li>
              <li>
                <a onClick={() => changeRole(user._id, "client")}>Client</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ))}
  </div>
</>
  );
};

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

export default AdminDashboard;
