// Collection 컴포넌트
import React, { useState } from 'react';
import '../style/collection.scss';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { collectionActions } from '../slice/collectionSlice';

const options = [
  'Move',
  'Run collection',
  'Add request',
  'Add folder',
  'Delete',
];



const ITEM_HEIGHT = 50;

export default function Collection(props) {
  const dispatch = useDispatch();
  const { workspaceId } = useParams(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleOptionClick = (option) => {
    if (option === 'Delete') {
      handleDeleteClick(); 
    } else if (option === 'Move') {

    } else if (option === 'Run collection') {
    
    } 
  };

  const handleDeleteClick = (id) => {
    if (!window.confirm("해당 collection를 삭제하시겠습니까 ?")) return false;
    dispatch(collectionActions.deleteCollection(id)); 
  };
  
  return (
    <div>
     <div className='collection_container'>
      {props.collections.map((collection) => (
        <div key={collection.id} className='collection_list'>
          <button className='collection_list_btn'><ChevronRightIcon /></button>
          <button className='collection_list_name'>{collection.collectionname}
            <Link to={`/workspace/${workspaceId}/collection/${collection.id}`} style={{ textDecoration: 'none', color: 'black' }}>{collection.collectionname}</Link>
          </button>

          <div className="collection_list_options" style={{ opacity: open ? 1 : 0 }}>
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
    onClick={() => handleOptionClick(option)}
  >
    {option}
  </MenuItem>
              // options.map((option) => (
              //   <MenuItem
              //    key={option}
              //    selected={option === 'Pyxis'} 
              //    onClick={handleClose}>
              //     {option}
              //   </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
