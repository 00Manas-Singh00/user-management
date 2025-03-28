import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Grid 
} from '@mui/material';

function UserCard({ 
  user, 
  onEdit, 
  onDelete 
}) {
  return (
    <Card sx={{ 
      maxWidth: 345, 
      margin: 2, 
      boxShadow: 3 
    }}>
      <CardMedia
        component="img"
        height="250"
        image={user.avatar}
        hoverEffect="scale(1.1)"
        alt={`${user.first_name} ${user.last_name}`}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h5" 
          fontWeight={600}
          component="div"
        >
          {user.first_name} {user.last_name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
        >
          {user.email}
        </Typography>
        
        <Grid 
          container 
          spacing={2} 
          sx={{ mt: 1 }}
        >
          <Grid item xs={6}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={() => onEdit(user)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="contained" 
              color="error" 
              fullWidth
              onClick={() => onDelete(user.id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserCard;