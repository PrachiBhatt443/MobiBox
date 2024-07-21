import React, { useState } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import homeImg from '../img/home.png';
import axios from 'axios';

const LandingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const encryptData = async (data, key) => {
    const iv = key.slice(0, 16);
    const encodedKey = new TextEncoder().encode(key);
    const encodedIv = new TextEncoder().encode(iv);
    const encodedData = new TextEncoder().encode(data);

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      encodedKey,
      { name: 'AES-CBC', length: 256 },
      false,
      ['encrypt']
    );

    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: encodedIv },
      cryptoKey,
      encodedData
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
  };

  const handleContinue = async () => {
    if (phoneNumber.length < 10) {
      setErrorMessage('The number you have entered is not correct, please check the number and try again.');
    } else {
      setErrorMessage('');
      setLoading(true);

      try {
        const requestData = {
          DeviceInfo: {
            PackageName: 'com.test.com',
            LangCode: 'en',
            DeviceID: 'test_dev_doc',
          },
          Referrer: {
            Affiliate: {
              Campaign: 'will be shared with you',
              ClickID: 'your clickid',
              Pub_ID: 'your pub id',
              Aff_ID: 'your aff id',
              extra: '',
              extra1: '',
              firstPageButtonID: 'msisdn-entry',
              secondPageButtonID: 'pin-entry',
              Country: 'the desired country',
            },
          },
          Request: {
            Action: 1,
            TransactionID: 'b5d7ab80-262e-4246-9dc0-a9ca3202cf74',
            SessionID: '',
            MSISDN: phoneNumber,
            PinCode: '',
          },
        };

        const encryptedData = await encryptData(JSON.stringify(requestData), 'FtmJ7frzTyWOzintybbqIWzwwclcPtaI');

        const response = await axios.post(
          'https://cors-anywhere.herokuapp.com/https://d3398n96t5wqx9.cloudfront.net/UsersAquisition/',
          { data: encryptedData },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 0e186445-0647-417c-ae27-8098533f1914',
            },
          }
        );

        if (response.data) {
          setApiData(response.data);
        } else {
          setErrorMessage('Invalid response from the API.');
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setErrorMessage('An error occurred while fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={2} pr={20} sx={{ width: '350px' }}>
        <img src={homeImg} alt="Home" style={{ width: '100%' }} />
      </Box>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Enter your phone number
        </Typography>
        <Box sx={{ mb: 2 }}>
          <PhoneInput
            country={'iq'}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            inputStyle={{ width: '100%' }}
            dropdownStyle={{ width: '100%' }}
            specialLabel=""
          />
        </Box>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleContinue} disabled={loading}>
            {loading ? 'Loading...' : 'CONTINUE'}
          </Button>
        </Box>
        {apiData && (
          <Box mt={2}>
            <Typography variant="h6" component="h2">
              API Data:
            </Typography>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </Box>
        )}
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Entertainment is a subscription service that will automatically renew for  USD/ 7 Day(s). You can unsubscribe from the service at anytime, by sending STOP to **** for (operator). To make use of this service, you must be 18 or more unless you have received permission from your parents or the person who is authorized to pay your bill.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Terms & Conditions - Privacy Policy
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
