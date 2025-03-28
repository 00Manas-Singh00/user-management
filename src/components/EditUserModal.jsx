import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';
import { userService } from '../services/api';

function EditUserModal({ open, onClose, user, onUpdate }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email
      };

      const response = await userService.updateUser(user.id, updatedUser);
      onUpdate({ ...user, ...updatedUser });
      onClose();
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;