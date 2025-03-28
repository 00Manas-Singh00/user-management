import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Authentication check
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/" />;
};

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;