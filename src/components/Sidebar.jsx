import React from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Collection from './Collection';

const buttons = [
  <Button key="new" className='btn-1'>New</Button>,
  <Button key="import" className='btn-2'>Import</Button>,
  <Button key="export" className='btn-3'>Export</Button>,
];

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div className="btn-group" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <IconButton aria-label="plus">
            <AddIcon fontSize="small" />
          </IconButton>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 5,
            },
          }}>
            <ButtonGroup size="small" aria-label="small button group" className="btn-len">
              {buttons}
            </ButtonGroup>
          </Box>
        </div>
      </div>
      <div className='sidebar_collection_container'>
        {/* <div className='sidebar_empty_collection'>
          <span>Create a collection for your requests</span>
        </div> */}
        <Collection/>
      </div>
    </div>
  );
}
