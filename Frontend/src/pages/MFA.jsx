// MFAPage.jsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();
const backend_url = 'http://localhost:3000/api/v1';

const MFAPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { email } = useParams();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      // show email as notification on screen
      const response = await axios.post(
        `${backend_url}/verifyOTP`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );

      const { status, message } = response;
      if (status === 200) {
        navigate('/dashboard');
      } else {
        setErrorMessage(error.response.data.message || 'Verification failed');  
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" style={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            style={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '3%',
            }}
          >
            <Avatar style={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              MFA Verification
            </Typography>
            <Box component="form" noValidate onSubmit={handleVerification} style={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="OTP"
                autoComplete="OTP"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
              {errorMessage && (
                <Typography color="error" style={{ marginTop: '1rem' }}>
                  {errorMessage}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default MFAPage;
