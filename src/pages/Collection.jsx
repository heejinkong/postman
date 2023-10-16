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
import { Star } from '@mui/icons-material';

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
  const [openList, setOpenList] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 컬렉션 데이터를 불러옵니다.
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
      // 이동 로직 추가
    } else if (option === 'Run collection') {
      // 컬렉션 실행 로직 추가
    } else if (option === 'Add request') {
      navigate(`/workspace/${workspaceId}/collection/${collectionId}/request`);
    }
  };

  const handleDeleteClick = (collectionId) => {
    if (!window.confirm('해당 collection를 삭제하시겠습니까 ?')) return false;

    // 로컬 스토리지에서 컬렉션 데이터 삭제
    localStorage.removeItem(`collection-${workspaceId}-${collectionId}`);

    // 컬렉션 목록 업데이트
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== collectionId)
    );

    navigate(`/workspace/${workspaceId}/collection/:collectionId`);
  };

  const handleListClick = () => {
    setOpenList(!open);
  };

  return (
    <div>
      <div className="collection_container">
        {collections.map((collection) => (
          <div key={collection.id} className="collection_list">
            <ListItemButton
              onClick={handleListClick}
              className="collection_list_btn"
            >
              {/* <ChevronRightIcon /> */}
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <button className="collection_list_name">
              <Link
                to={`/workspace/${workspaceId}/collection/${collection.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {collection.collectionname}
              </Link>
            </button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Star />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>

            <div
              className="collection_list_options"
              style={{ opacity: open ? 1 : 0 }}
            >
              <IconButton
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
          </div>
        ))}
      </div>
    </div>
  );
}
