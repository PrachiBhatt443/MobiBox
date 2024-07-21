// src/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Select, MenuItem, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import CountrySelect from './CountrySelect';

const Header = () => {
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('en'); // Default to English

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Photos
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              sx={{ mr: 2 }}
            >
              <MenuItem value={'en'}>EN</MenuItem>
              <MenuItem value={'ar'}>AR</MenuItem>
              {/* Add more languages as needed */}
            </Select>
            {/* <CountrySelect /> */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
