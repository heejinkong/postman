import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const [openList, setOpenList] = useState(false);

  const handleListClick = () => {
    setOpenList(!openList);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
        <ListItemButton onClick={handleListClick}>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* {collections.map((collection) => (
          <div key={collection.id} className="collection_list">
            <ListItemButton
              onClick={handleListClick}
              className="collection_list_btn"
            >
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <div className="collection_list_name">
              <Link
                to={`/workspace/${workspaceId}/collection/${collection.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {collection.collectionname}
              </Link>
            </div>
            <div>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </div> */}
        {/* </div>
        ))} */}
      </div>
    </div>
  );
}
