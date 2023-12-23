import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();
const backend_url = 'http://localhost:3000/api/v1';

export default function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/isLoggedIn`,
        { withCredentials: true }
      );
      const { status, data } = response;
      setIsLoggedIn(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check login status when the component mounts
    checkLoginStatus();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      checkLoginStatus();
      const { status, data } = response;
      if (status === 200) {
        if (data.MFAEnabled === true) {
          navigate(`/mfa/${email}`);
        } else {
          // get user from database by email
          if (data.role === 'client') {
            return navigate('/');
          } else if (data.role === 'admin') {
            return navigate('/admin');
          } else if (data.role === 'manager') {
            return navigate('/manager');
          } else {
            return navigate('/agent');
          }
        }
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }

    // Clear the input values after submission
    setEmail('');
    setPassword('');
  };

  const clearSession = async () => {
    try {
      await axios.post(`${backend_url}/logout`, {}, { withCredentials: true });
      checkLoginStatus();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Call the function to clear cookies and end the session when the component mounts
    clearSession();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <>
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
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} style={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  style={{ paddingBottom: '1rem' }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>               
                <Grid container>
                  <Grid item style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Link href="/Register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
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
    </>
  );
}
