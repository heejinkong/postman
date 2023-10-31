import React from 'react';
import '../style/header.scss';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <div className="header-home-container">
          <Stack direction="row" spacing={2}>
            <Button className="header-home-btn" component={Link} to={'/'}>
              Home
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Header;
