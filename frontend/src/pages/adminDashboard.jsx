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
      const response = await axios({
        method: "PUT",
        url: "http://localhost:3000/admin/changeRole",
        headers: { withCredentials: true },
        data: {
          userId,
          newRole, // This is the body part
        },
      });
      const { data } = response;
      if(data.success){
        fetchUsers();
        alert("Role changed successfully");
      }else{
        console.error('Failed to change role:', data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div className="flex flex-row items-center overflow-auto h-screen">
      {users.map((user,i) => (
        <div
          key={user._id}
          className="m-1 w-full transform transition duration-500 ease-in-out hover:scale-105"
        >
          <div className="card w-full h-full bg-gradient-to-r  from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white shadow-lg rounded-lg p-1">
            <div className="card-body">
              <h2 className="card-title text-lg">User</h2>
              <p className="text-base text-justify">Username: {user.username} </p>
              <p className="text-base">Email: {user.email} </p>
              <p className="text-base">DOB: {user.DOB} </p>
              <p className="text-base">Role: {user.role}</p>
              <p className="text-base">Status: {user.status} </p>
              <div className="card-actions ">
                <div className="dropdown relative justify-end py-1 z-10">
                  <button 
                    id={"my-dropdown"+i}
                    tabIndex={0}
                    role="button"
                    className="btn bg-white rounded-full"
                  >
                    {user.role}
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-0 shadow bg-base-100 rounded-box w-25 text-black"
                  >
                    <li>
                      <a onClick={() => {changeRole(user._id, "admin")
                    document.getElementById("my-dropdown"+i).innerText="admin"}}>admin</a>
                    </li>
                    <li>
                      <a onClick={() => {changeRole(user._id, "agent")
                    document.getElementById("my-dropdown"+i).innerText="agent"}}>agent</a>
                    </li>
                    <li>
                      <a onClick={() => {changeRole(user._id, "manager")
                    document.getElementById("my-dropdown"+i).innerText="manager"}}>
                        manager
                      </a>
                    </li>
                    <li>
                      <a onClick={() => {changeRole(user._id, "client")
                    document.getElementById("my-dropdown"+i).innerText="client"}}>
                        client
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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
