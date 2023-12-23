import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from 'axios';
import adminPhoto from '../assets/admin.jpg';
import adminPhoto2 from '../assets/admin2.jpg';
import mugglePhoto from '../assets/user.jpg';

const ViewProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [isUpdatePanelVisible, setUpdatePanelVisible] = useState(false);
    const [isMainPanelVisible, setMainPanelVisible] = useState(true);
    const [isChangePasswordPanelVisible, setChangePasswordPanelVisible] = useState(false);
    const [successPanelVisible, setSuccessPanelVisible] = useState(false);
    const [failPanelVisible, setFailPanelVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newDOB, setNewDOB] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/client/getUser', { withCredentials: true });
            const { data } = response;
            setUser(data || []);
        } catch (error) {
            navigate('/login');
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

    const handleChangePasswordClick = () => {
        if (isChangePasswordPanelVisible) {
            // If the update panel is already visible, hide it
            setChangePasswordPanelVisible(false);
            setMainPanelVisible(true);
        }
        else {
            setChangePasswordPanelVisible(true);
            setMainPanelVisible(false);
        }

    };

    const handleUpdateClick = () => {
        if (isChangePasswordPanelVisible) {
            setMainPanelVisible(true);
            setChangePasswordPanelVisible(false);
            setUpdatePanelVisible(true)
        }
        else if (isUpdatePanelVisible) {
            // If the update panel is already visible, hide it
            setUpdatePanelVisible(false);
        }
        else {
            setUpdatePanelVisible(true);

        }
    };

    const handleChangePassword = async () => {
        try {

            const response = await axios.put('http://localhost:3000/client/changePassword', { oldPassword, newPassword }, { withCredentials: true });
            const { data } = response;
            // display panel for 10 seconds
            setSuccessPanelVisible(true);
            setTimeout(() => {
                setOldPassword('');
                setNewPassword('');
                setSuccessPanelVisible(false);
                setMainPanelVisible(true);
            }, 5000);
            setChangePasswordPanelVisible(false);


        }
        catch (error)  {
            setOldPassword('');
            setNewPassword('');
            setFailPanelVisible(true);
            setTimeout(() => {
                setFailPanelVisible(false);
            }, 5000);
        }

        setUser(data || []);
        setOldPassword('');
        setNewPassword('');

        await getUser();
    };

    const handleUpdatName = async () => {
        const response = await axios.put('http://localhost:3000/client/updateName', { newName }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewName('');
        setUpdatePanelVisible(false);

        await getUser();
    };

    const handleUpdateUsername = async () => {
        const response = await axios.put('http://localhost:3000/client/updateUsername', { newUsername }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewUsername('');
        setUpdatePanelVisible(false);
        await getUser();
    };
    const handleUpdateEmail = async () => {
        const response = await axios.put('http://localhost:3000/client/updateEmail', { newEmail }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewEmail('');
        setUpdatePanelVisible(false);
        await getUser();
    };
    const handleUpdateDOB = async () => {
        const response = await axios.put('http://localhost:3000/client/updateDOB', { newDOB }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewDOB('');
        setUpdatePanelVisible(false);
        await getUser();
    };
    const handleUpdateAddress = async () => {
        const response = await axios.put('http://localhost:3000/client/updateAddress', { newAddress }, { withCredentials: true });
        const { data } = response;
        setUser(data || []);
        setNewAddress('');
        setUpdatePanelVisible(false);
        await getUser();
    };

    const formattedDOB = user.DOB ? new Date(user.DOB).toLocaleDateString() : '';

    if (user) {
        return (
            <div>
                {/* Your ViewProfile component content goes here */}
                <div className="card lg:card-side bg-base-100 kight-xl" style={{ marginLeft: "auto", marginRight: "auto", width: '60%' }}>
                    <div className="card-body">
                        <div className="card-title">
                            <h1 style={{ fontSize: '2rem' }}>Profile Information!</h1><br />
                            <button className="btn btn-sm btn-secondary" onClick={handleUpdateClick}>
                                Update
                            </button>
                            <button className="btn btn-sm btn-secondary" onClick={handleChangePasswordClick}>
                                Change Password
                            </button>
                        </div>
                        {isChangePasswordPanelVisible && (
                            <div>
                                <input
                                    className='input input-bordered input-info w-full max-w-xs'
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter old Password"
                                />
                                <input
                                    className='input input-bordered input-info w-full max-w-xs'
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new Password"
                                />
                                <div>
                                    <button onClick={handleChangePassword} className='btn btn-outline btn-info'>Update Password</button>
                                </div>
                            </div>
                        )}
                        {successPanelVisible && (
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Password Changed Successfully!!</span>
                            </div>
                        )}
                        {failPanelVisible && (
                            <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>An error has occured during password change.</span>
                            </div>
                        )}


                        {isMainPanelVisible && (
                            <div>
                                <p className="text-xl">User ID: {user._id}</p>
                                <p className="text-xl">Name: {user.name}</p>
                                {isUpdatePanelVisible && (
                                    <div>
                                        <input
                                            className='input input-bordered input-info w-full max-w-xs'
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Enter new Name"
                                        />
                                        <button onClick={handleUpdatName} className='btn btn-outline btn-info'>Update Name</button>
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p className="text-xl">Username: {user.username} </p>
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
                                        <button onClick={handleUpdateEmail} className='btn btn-outline btn-info'>Update Email</button>
                                    </div>
                                )}
                                <p className="text-xl">DOB: {formattedDOB} </p>
                                {isUpdatePanelVisible && (
                                    <div>
                                        <input
                                            className='input input-bordered input-info w-full max-w-xs'
                                            type="date"
                                            value={newDOB}
                                            onChange={(e) => setNewDOB(e.target.value)}
                                            placeholder="Enter new DOB"
                                        />
                                        <button onClick={handleUpdateDOB} className='btn btn-outline btn-info'>Update DOB</button>
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
                                        <button onClick={handleUpdateAddress} className='btn btn-outline btn-info'>Update Address</button>
                                    </div>
                                )}
                                <p className="text-xl">MFA Enabled: {user.MFAEnabled ? 'True' : 'False'} </p>
                                <p className="text-xl">Role: {user.role}</p>
                                <p className="text-xl">Status: {user.status} </p>
                            </div>
                        )}
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
