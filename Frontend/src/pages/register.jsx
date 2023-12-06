import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import photo1 from '../assets/images/photo-1496917756835-20cb06e75b4e.avif';
import logo from '../assets/images/Final logo.png';

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
      const { status, data } = response;
      if (status === 201) {
        setSuccessMessage('SignUp successful');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

       

      {/* Left side: Form */}
      <Grid item xs={12} sm={6} component={Paper} elevation={6} square sx={{
        backgroundColor: '#f0f0f0', // Set your desired background color here
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #ccc',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          {/* Logo and Company Name Section */}
          <Grid item xs={12} sx={{ textAlign: 'left', mb: 4, paddingLeft: 2, paddingRight: 2 }}>
            <div style={{
              backgroundColor: '#f0f0f0', // Set your desired background color here
              padding: '20px',
              borderRadius: '10px',
              border: '2px solid #ccc',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
            }}>
              <img src={logo} alt="Logo" style={{ height: '80px', maxWidth: '100%', marginRight: '10px' }} />
              <Typography variant="h2" sx={{ mt: 1, display: 'inline-block', maxHeight: '80px', overflow: 'hidden' }}>GIU Help Desk</Typography>
            </div>
          </Grid>

          <Grid item xs={10} sm={8} md={6}>
            <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
                fullWidth
                label="Full Name"
                name="name"
                onChange={handleChange}
                margin="normal"
                required
                autoFocus
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Date of Birth"
                name="DOB"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={4}
                onChange={handleChange}
                margin="normal"
                required
              />
                <span>
                  {errorMessage} {successMessage}
                </span>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Sign Up
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>

      {/* Right side: Photo */}
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: `url(${photo1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default Register;

