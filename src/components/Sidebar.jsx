import React, { useState } from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Collection from '../pages/Collection';
import { Link, Route, Routes } from 'react-router-dom';


export default function Sidebar() {
  const [collections, setCollections] = useState([]);

  const addNewCollection = () => {
    setCollections(prevCollections => [
      ...prevCollections,
      { id: Date.now(), name: `New Collection` }
    ]);
  };

  const buttons = [
    <Link to = "/workspace/:workspaceId" >
    <Button key="new" className='btn-1' onClick={addNewCollection}>New</Button>
    </Link>,
    <Button key="import" className='btn-2'>Import</Button>,
    <Button key="export" className='btn-3'>Export</Button>,
  ];

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div className="btn-group" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Link to= "/collection">
          <IconButton aria-label="plus" onClick={addNewCollection}>
            <AddIcon fontSize="small" />
          </IconButton>
         </Link>
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
      <Routes>
  <Route path='/' element={
    <div className='sidebar_empty_collection'>
      <span>Create a collection for your requests</span>
    </div>
  } />
  <Route path='/collection' element={<Collection collections={collections} />} />
</Routes>

      </div>
    </div>
  );
}
