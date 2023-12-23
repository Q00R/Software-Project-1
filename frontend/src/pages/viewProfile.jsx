import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import adminPhoto from '../assets/admin.jpg';
import adminPhoto2 from '../assets/admin2.jpg';
import mugglePhoto from '../assets/user.jpg';

const ViewProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [isUpdatePanelVisible, setUpdatePanelVisible] = useState(false);

  const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newDOB, setNewDOB] = useState('');


  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/getUser', { withCredentials: true });
      const { data } = response;
      setUser(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    getUser();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const setMFA = async () => {
    try {
      let response = "";
      if (user.MFAEnabled) {
        response = await axios.post('http://localhost:3000/api/v1/disableMFA', {}, { withCredentials: true });
      } else {
        response = await axios.post('http://localhost:3000/api/v1/enableMFA', {}, { withCredentials: true });
      }
      const { data } = response;
      setUser(data || []);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateClick = () => {
    if (isUpdatePanelVisible) {
      // If the update panel is already visible, hide it
      setUpdatePanelVisible(false);
    }
    else
    {
        setUpdatePanelVisible(true);
    }
  };

    const handleUpdateUsername = async () => {
        const response = await axios.post('http://localhost:3000/api/v1/updateUsername', { newUsername }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewUsername('');
        setUpdatePanelVisible(false);

        await getUser();
    };
    const handleUpdateEmail = async () => {
    };
    const handleUpdateDOB = async () => {
    };
    const handleUpdateAddress = async () => {
    };

  const formattedDOB = user.DOB ? new Date(user.DOB).toLocaleDateString() : '';

  if (user) {
    return (
      <div>
        {/* Your ViewProfile component content goes here */}
        <div className="card lg:card-side bg-base-100 kight-xl" style={{ marginLeft: "auto", marginRight: "auto", width: '60%' }}>
          <div className="card-body">
            <h1 className="card-title" style={{ fontSize: '2rem' }}>Profile Information!</h1>
            <p className="text-xl">User ID: {user._id}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="text-xl">User Name: {user.username} </p>
              <button className="btn btn-sm btn-secondary" onClick={handleUpdateClick}>
                Update
              </button>
            </div>
            {isUpdatePanelVisible && (
              <div>
                <input
                  className='input input-bordered input-info w-full max-w-xs'
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
                <button className='btn btn-outline btn-info' onClick={handleUpdateUsername}>Update Username</button>
              </div>
            )}
            <p className="text-xl">Email: {user.email} </p>
            {isUpdatePanelVisible && (
              <div>
                <input
                  className='input input-bordered input-info w-full max-w-xs'
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new Email"
                />
                <button className='btn btn-outline btn-info'>Update Email</button>
              </div>
            )}
            <p className="text-xl">DOB: {formattedDOB} </p>
            {isUpdatePanelVisible && (
              <div>
                <input
                  className='input input-bordered input-info w-full max-w-xs'
                  type="text"
                  value={newDOB}
                  onChange={(e) => setNewDOB(e.target.value)}
                  placeholder="Enter new DOB"
                />
                <button className='btn btn-outline btn-info'>Update DOB</button>
              </div>
            )}
            <p className="text-xl">Address: {user.address} </p>
            {isUpdatePanelVisible && (
              <div>
                <input
                  className='input input-bordered input-info w-full max-w-xs'
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter new Address"
                />
                <button className='btn btn-outline btn-info'>Update Address</button>
              </div>
            )}
            <p className="text-xl">MFA Enabled: {user.MFAEnabled ? 'True' : 'False'} </p>
            <p className="text-xl">Role: {user.role}</p>
            <p className="text-xl">Status: {user.status} </p>
          </div>
          <div>
            {user.role === 'admin' ? (
              <figure><img src={adminPhoto} alt="Admin" /></figure>
            ) : (
              <figure><img src={mugglePhoto} alt="User" /></figure>
            )}
          </div>
        </div>
        <div style={{ alignSelf: 'flex-end', marginLeft: "auto", marginRight: "auto", width: '60%' }}>
          <button className={user.MFAEnabled ? "btn btn-block btn-error" : "btn btn-block btn-info"} onClick={setMFA}>
            {user.MFAEnabled ? 'Disable MFA' : 'Enable MFA'}
          </button>
        </div>
      </div>
    );
  }

  // Placeholder content or loading spinner while checking login status
  return <div>Loading...</div>;
};

export default ViewProfile;
