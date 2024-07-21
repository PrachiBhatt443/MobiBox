// src/LandingPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { PhoneAndroid } from '@mui/icons-material';

const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Validate phone number (example: length check)
    if (phoneNumber.length !== 10) {
      setError(true);
    } else {
      setError(false);
      // Handle API call
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <PhoneAndroid style={{ fontSize: 50, marginBottom: '1rem' }} />
        <Typography variant="h6">Enter your phone number</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="91Mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={error}
          helperText={error ? 'The number you have entered is not correct, please check the number and try again' : ''}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          CONTINUE
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          Entertainment is a subscription service that will automatically renew for 1 USD/ 7 Day(s). You can unsubscribe from the service at anytime, by sending STOP to **** for (operator). To make use of this service, you must be 18 or more unless you have received permission from your parents or the person who is authorized to pay your bill.
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          <a href="#terms">Terms & Conditions</a> - <a href="#privacy">Privacy Policy</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
