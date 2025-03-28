import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box, 
  Alert,
  Checkbox,
  FormControlLabel,
  Link
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
      localStorage.setItem('userToken', response.token);
      navigate('/users');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          <Typography 
            component="h1" 
            variant="h4"
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: 'text.primary'
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
            Please sign in to continue
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 2,
                  borderRadius: 1
                }}
              >
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 2
            }}>
              <FormControlLabel
                control={<Checkbox size="small" color="primary" />}
                label="Remember me"
                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
              />
              <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 2,
                mb: 3,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'medium',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: '#1976D2',
                }
              }}
            >
              Sign In
            </Button>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don't have an account?{' '}
              <Link href="#" sx={{ fontWeight: 'medium' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;