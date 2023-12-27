import { useEffect, useState } from "react";
import axios from "axios";
import AboutUs from "../components/AboutUs";
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
      const response = await axios.put(
        "http://localhost:3000/admin/changeRole",
        { userId: userId, newRole: newRole },
        { withCredentials: true }
      );
      const { data } = response;
      if (response.status == 200) {
        fetchUsers();
      } else {
        console.error("Failed to change role:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    // ... (other imports and component code)

    <div>
      <div
        key="users"
        className="flex flex-row font-mono m-4 overflow-x-scroll scrollbar-thin items-start justify-start scrollbar-track-transparent scrollbar-track-rounded-md hover:scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md"
      >
        {users.map((user, i) => (
          <div
            className={`max-w-md shadow-md rounded-md overflow-hidden ease-in-out duration-300 hover:scale-105 border border-black bg-gradient-to-r from-secondary to-primary hover:from-accent hover:to-secondary w-[340px] h-[340px] flex-shrink-0 m-3 `}
            key={i}
          >
            <div className="p-4">
              <h1 className="font-bold text-xl mb-2">{user.username}</h1>
              <p className="text-gray-600 mb-2">Role: {user.role}</p>
              <p className="text-gray-600 mb-2">User ID: {user._id}</p>
              <p className="text-gray-600 mb-2">Email: {user.email}</p>
              <p className="text-gray-600 mb-2">DOB: {user.DOB}</p>
              <p className="text-gray-600 mb-2">Status: {user.status}</p>
            </div>
            <div className="m-3">
              <div className="dropdown dropdown-top ">
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-${user.role.toLowerCase()} rounded-full w-fit h-8`}
                >
                  Change Role
                </div>
                <ul
                  tabIndex={0}
                  className="text-gray-600 mb-2 dropdown-content z-[1] menu p-2 shadow bg-gray-400 rounded-box w-40 justify-center items-center"
                >
                  <li>
                    <a onClick={() => changeRole(user._id, "admin")}>Admin</a>
                  </li>
                  <li>
                    <a onClick={() => changeRole(user._id, "agent")}>Agent</a>
                  </li>
                  <li>
                    <a onClick={() => changeRole(user._id, "manager")}>
                      Manager
                    </a>
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
      {/* <div className="flex flex-row items-center overflow-auto h-screen">
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
    </div> */}
      <section>
        <AboutUs />
      </section>
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
