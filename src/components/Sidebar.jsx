import React from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


const buttons = [
  <Button key="new">New</Button>,
  <Button key="import">Import</Button>,
  <Button key="export">Export</Button>,
];


export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <IconButton aria-label="plus">
            <AddIcon fontSize="small" />
          </IconButton>
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 5,
        },
      }}
    >
      <ButtonGroup  size="small" aria-label="small button group">
        {buttons}
      </ButtonGroup>
    </Box>
        </div>
      </div>
    </div>
  );
}
