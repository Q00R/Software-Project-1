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
      if (!response.data.error && status === 200) {
        setSuccessMessage('SignUp successful');
        navigate('/login');
      } else {
        setErrorMessage(data.message, response.data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex">
      {/* Right side: Photo */}
      <div
        className="hidden sm:block sm:flex-1 md:flex-1 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        }}
      />
      {/* Left side: Form */}
        <div className="h-full md:w-5/12 p-8 flex flex-col items-center justify-center h-full">
          {/* Logo and Company Name Section */}
          <div className="flex mb-8 items-center justify-center">
            <img src={logo} alt="Logo" className="h-16 max-w-full mr-4" />
            <h2 className="text-3xl">Sign up</h2>
          </div>

          <form className="w-full max-w-sm" onSubmit={handleSubmit} autoComplete="off">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                placeholder="eg: Boraie Abd el Hamed"
                autoFocus
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>

            {/* Username */}
            
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                placeholder="eg: BoraieBob"
                autoFocus
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                placeholder="eg: BoraieSigma@gmail.com"
                autoFocus
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                placeholder="eg: Bora3y123"
                autoFocus
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Date of Birth
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                autoFocus
                type="date"
                name="DOB"
                onChange={handleChange}
                value={formData.DOB}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="input input-bordered input-primary rounded w-full py-2 px-3"
                placeholder="eg: Mansoura, Egypt"
                autoFocus
                name="address"
                onChange={handleChange}
                value={formData.address}
                rows={4}
                required
              />
            </div>

            {/* Error and Success Messages */}
            {(errorMessage && (
            <div role="alert" className="alert alert-error" style={{width:"100%"}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMessage}</span>
            </div>
            ))}
            {(successMessage && (
            <div role="alert" className="alert alert-success" style={{width:"100%"}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{successMessage}</span>
            </div>
            ))}
            <br/>
            {/* Sign Up Button */}
            <button 
              style={{width:"100%"}}
              type="submit"
              className="mb-4 btn btn-primary rounded w-full py-2 px-3"
            >
              Sign Up
            </button>
          </form>
      </div>

      
    </div>
  );
};

export default Register;