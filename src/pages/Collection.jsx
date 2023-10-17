import React, { useState, useEffect, useSyncExternalStore } from 'react';
import '../style/collection.scss';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { List, ListItemIcon, ListItemText } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';

const options = [
  'Move',
  'Run collection',
  'Add request',
  'Add folder',
  'Delete',
];
const ITEM_HEIGHT = 50;

export default function Collection(props) {
  const { workspaceId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [collections, setCollections] = useState([]);
  const [clickCollection, setClickCollection] = useState(null);
  const navigate = useNavigate();

  const handleListClick = (collectionId) => {
    if (collectionId === clickCollection) {
      setClickCollection(null);
    } else {
      setClickCollection(collectionId);
    }
  };

  useEffect(() => {
    const loadCollectionsFromLocalStorage = () => {
      const collections = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`collection-${workspaceId}`)) {
          const collection = JSON.parse(localStorage.getItem(key));
          collections.push(collection);
        }
      }
      setCollections(collections);
      console.table(collections);
    };
    loadCollectionsFromLocalStorage();
  }, [workspaceId]);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClick = (e) => {
    if (e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option, collectionId) => {
    if (option === 'Delete') {
      handleDeleteClick(collectionId);
    } else if (option === 'Move') {
      // Add logic for moving the collection
    } else if (option === 'Run collection') {
      // Add logic for running the collection
    } else if (option === 'Add request') {
      navigate(`/workspace/${workspaceId}/collection/${collectionId}/request`);
    }
  };

  const handleDeleteClick = (collectionId) => {
    if (!window.confirm('Are you sure you want to delete this collection?'))
      return false;

    localStorage.removeItem(`collection-${workspaceId}-${collectionId}`);

    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== collectionId)
    );

    navigate(`/workspace/${workspaceId}/collection/:collectionId`);
  };

  return (
    <div>
      <div className="collection_container">
        {collections.map((collection) => (
          <div key={collection.id}>
            <Link
              to={`/workspace/${workspaceId}/collection/${collection.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItemButton onClick={() => handleListClick(collection.id)}>
                {clickCollection === collection.id ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}

                <ListItemText primary={collection.collectionname} />
                <div
                  className="collection_list_options"
                  style={{ opacity: open ? 1 : 0 }}
                >
                  <IconButton
                    style={{ position: 'relative' }}
                    disableRipple
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option}
                        selected={option === 'Delete'}
                        onClick={() => handleOptionClick(option, collection.id)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </ListItemButton>
              <Collapse
                in={clickCollection === collection.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
