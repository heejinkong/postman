import React from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CollectionList from '../pages/CollectionList';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const location = useLocation();
  const workspaceId = useSelector((state) => state.workspaceReducers.id);

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

  const collections = getCollectionsFromLocalStorage();

  const buttons = [
    <Link key="link" to={`/workspaces/:workspaceId`}>
      <Button key="new" className="btn-1">
        New
      </Button>
    </Link>,
    <Button key="import" className="btn-2">
      Import
    </Button>,
    <Button key="export" className="btn-3">
      Export
    </Button>,
  ];

  const showPlusButton = location.pathname === '/';

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div
          className="btn-group"
          style={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          {workspaceId && !showPlusButton ? (
            <Link to={`/workspaces/${workspaceId}/collections/:collectionId`}>
              <IconButton aria-label="plus">
                <AddIcon fontSize="small" />
              </IconButton>
            </Link>
          ) : (
            ''
          )}
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
            <ButtonGroup
              size="small"
              aria-label="small button group"
              className="btn-len"
            >
              {buttons}
            </ButtonGroup>
          </Box>
        </div>
      </div>
      <div className="sidebar_collection_container">
        <Routes>
          <Route
            path="/workspaces/:workspaceId"
            element={
              <div>
                {collections.length > 0 ? (
                  <CollectionList collections={collections} />
                ) : (
                  <div className="sidebar_empty_collection">
                    Create a collection for your requests
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/workspaces/:workspaceId/collections/:collectionId"
            element={<CollectionList collections={collections} />}
          />
          <Route
            path="/workspaces/:workspaceId/collections/:collectionId/:requestName"
            element={<CollectionList collections={collections} />}
          />
        </Routes>
      </div>
    </div>
  );
}
