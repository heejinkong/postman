import React from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Collection from '../pages/Collection';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const workspaceId = pathSegments[pathSegments.length - 1];

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
    console.log(collections);
    return collections;
  };

  const collectionLocation = () => {
    location.reload();
  };
  const collections = getCollectionsFromLocalStorage();

  const buttons = [
    <Link to={`/workspace/:workspaceId`}>
      <Button key="new" className='btn-1'>New</Button>
    </Link>,
    <Button key="import" className='btn-2'>Import</Button>,
    <Button key="export" className='btn-3'>Export</Button>,
  ];

  const showPlusButton = location.pathname === '/';

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div className="btn-group" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {!showPlusButton ? (
            <Link to={`/workspace/${workspaceId}/collection/:collectoinId`} onClick={collectionLocation}>
              <IconButton aria-label="plus">
                <AddIcon fontSize="small" />
              </IconButton>
            </Link>) : ('')
          }
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
            <div>
              { collections.length > 0 ? (
                <Collection collections={collections}/>
              ) : (
                <div className='sidebar_empty_collection'>Create a collection for your requests</div>
              )}
            </div>
          } />
          <Route path='/workspace/:workspaceId/collection/:collectionId' element={<Collection collections={collections} />} />
          <Route path='/workspace/:workspaceId/collection/:collectionId/request' element={<Collection collections={collections} />} />
        </Routes>
      </div>
    </div>
  );
}
