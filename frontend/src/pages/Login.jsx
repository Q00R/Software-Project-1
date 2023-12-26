import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backend_url = 'http://localhost:3000/api/v1';

export default function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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
      const { status, data } = response;
      if (status === 200) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userRole', data.userRole);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('role', data.userRole);
        if (data.MFAEnabled === true) {
          // store email in local storage
          localStorage.setItem("email", email)
          navigate(`/mfa`);
        } else {
          // get user from database by email
          if (data.role === 'client') {
            navigate('/client');
          } else if (data.role === 'admin') {
            navigate('/admin');
          } else if (data.role === 'manager') {
            navigate('/manager');
          } else {
            navigate('/agent');
          }
          window.dispatchEvent(new CustomEvent('role', { detail: { role: data.role } }));
          return;
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
      window.dispatchEvent(new CustomEvent('role', { detail: { role: "" } }));
      localStorage.clear();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Call the function to clear cookies and end the session when the component mounts
    clearSession();
    console.log('session cleared');
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <>
      <div className="h-screen flex">
        <div
          className="hidden md:block md:w-7/12 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          }}
        ></div>
        <div className="h-full md:w-5/12 p-8" style={{ height: "75%" }}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-1">
              <div className="bg-secondary-main rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>

              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  className="input input-bordered input-primary rounded w-full py-2 px-3"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input 
                  className="input input-bordered input-primary rounded w-full py-2 px-3"
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
              className="btn btn-primary"
              type="submit"
              >
                Sign In
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}