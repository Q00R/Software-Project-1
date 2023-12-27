import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import photo1 from '../assets/photo-1496917756835-20cb06e75b4e.avif';
import logo from '../assets/Final logo.png';

const backend_url = 'http://localhost:3000/api/v1';


const Register = () => {
  const navigate = useNavigate(); // Ensure that useNavigate is called within the functional component body

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    DOB: '',
    address: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/register`,
        {
          ...formData,
          role: 'client',
        },
        { withCredentials: true }
      
      );
      console.log(response);
      const { status, data } = response;
      if (status === 200) {
        setSuccessMessage('SignUp successful');
        navigate('/login');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex font-mono">
      {/* Right side: Photo */}
      <div
        className="hidden sm:block sm:flex-1 md:flex-1 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        }}
      />
      {/* Left side: Form */}
        <div className="p-8 rounded shadow-md w-full max-w-md">
          {/* Logo and Company Name Section */}
          <div className="flex items-center mb-8">
            <img src={logo} alt="Logo" className="h-16 max-w-full mr-4" />
            <h2 className="text-3xl">Sign up</h2>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                onChange={handleChange}
                value={formData.DOB}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Address
              </label>
              <textarea
                name="address"
                onChange={handleChange}
                value={formData.address}
                rows={4}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>

            {/* Error and Success Messages */}
            <span className="text-red-500">{errorMessage}</span>
            <span className="text-green-500">{successMessage}</span>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </form>
      </div>

      
    </div>
  );
};

export default Register;