import React, { useEffect, useState } from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Collection from '../pages/Collection';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collectionActions } from '../slice/collectionSlice';

export default function Sidebar() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const workspaceId = pathSegments[pathSegments.length - 1];

  const dispatch = useDispatch();

  // 로컬 스토리지에서 collections 데이터를 가져옴
  const getCollectionsFromLocalStorage = () => {
    const collections = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`collection-${workspaceId}-`)) {
        const collectionData = localStorage.getItem(key);
        const collection = collectionData ? JSON.parse(collectionData) : null;
        if (collection) {
          collections.push(collection);
        }
      }
    }
    return collections;
  };

  const collections = getCollectionsFromLocalStorage();
  
  const buttons = [
    <Link to={`/workspace/:workspaceId`}>
      <Button key="new" className='btn-1'>New</Button>
    </Link>,
    <Button key="import" className='btn-2'>Import</Button>,
    <Button key="export" className='btn-3'>Export</Button>,
  ];
  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div className="btn-group" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Link to={`/workspace/${workspaceId}/collection/:collectoinId`}>
          <IconButton aria-label="plus">
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
  <Route path='/workspace/:workspaceId' element={
    <div className='sidebar_empty_collection'>
      { collections.length > 0 ? (
                    <Collection collections={collections}/>
                ) : (
                    <span>Create a collection for your requests</span>
                )}
    </div>
  } />
  <Route path='/workspace/:workspaceId/collection/:collectionId' element={<Collection collections={collections} />} />
</Routes>

      </div>
    </div>
  );
}
