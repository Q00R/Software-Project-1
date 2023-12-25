// MFAPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const defaultTheme = createTheme();
const backend_url = 'http://localhost:3000/api/v1';

const MFA = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const email = localStorage.getItem('email');

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/verifyOTP`,
        {
          email,
          enteredOTP: otp,
        },
        { withCredentials: true }
      );
      const { status, data } = response;
      alert(response.data.message);
      alert(response.data.MFAEnabled);

      if (status === 200) {
        if (data.role === 'client') {
          return navigate('/');
        } else if (data.role === 'admin') {
          return navigate('/admin');
        } else if (data.role === 'manager') {
          return navigate('/manager');
        } else {
          return navigate('/agent');
        }
      } else {
        setErrorMessage(error.response
          .message || 'Verification failed');
      }
    } catch (error) {
      setErrorMessage(error.response.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:flex md:flex-shrink-0 md:w-7/12"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f8f9fa', // Replace with your background color
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex-1 flex flex-col">
        <div
          className="my-8 mx-4 flex flex-col items-center p-8"
        >
          <div className="m-1 bg-secondary-main">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">MFA Verification</h1>
          <form
            noValidate
            onSubmit={handleVerification}
            className="mt-1 flex flex-col"
          >
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Verify
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-1">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MFA;