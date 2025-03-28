import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Container, 
  Pagination, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { userService } from '../services/api';
import EditUserModal from './EditUserModal';
import UserCard from './UserCard';

function UserList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (currentPage) => {
    try {
      const data = await userService.getUsers(currentPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      handleError('Failed to fetch users');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(userToDelete);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
      setIsDeleteDialogOpen(false);
      handleSuccess('User deleted successfully');
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      handleError('Failed to delete user');
    }
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
    handleSuccess('User updated successfully');
  };

  const handleSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid 
        container 
        spacing={3}
        sx={{
          justifyContent: 'center',
          [theme.breakpoints.down('sm')]: {
            spacing: 2
          }
        }}
      >
        {users.map((user) => (
          <Grid 
            item 
            key={user.id}
            xs={12} 
            sm={6} 
            md={4} 
            lg={3}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <UserCard
              user={user}
              onEdit={() => handleEdit(user)}
              onDelete={() => handleDeleteConfirmation(user.id)}
              sx={{
                width: '100%',
                maxWidth: 345,
                margin: 0,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease'
                }
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid 
        container 
        justifyContent="center" 
        sx={{ 
          mt: 4, 
          mb: 2,
          [theme.breakpoints.down('sm')]: {
            mt: 3
          }
        }}
      >
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary"
          size={isMobile ? 'small' : 'medium'}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: isMobile ? '0.875rem' : '1rem'
            }
          }}
        />
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)} 
            color="primary"
            size={isMobile ? 'large' : 'medium'}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            autoFocus
            size={isMobile ? 'large' : 'medium'}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onUpdate={handleUpdateUser}
          fullScreen={isMobile}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%',
            boxShadow: 3 
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserList;