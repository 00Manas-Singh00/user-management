import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(email, password);
      
      // Store token in localStorage
      localStorage.setItem('userToken', response.token);
      
      // Navigate to user list
      navigate('/users');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;