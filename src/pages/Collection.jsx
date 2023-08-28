import React, { useState } from 'react';
import '../style/collection.scss';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Move',
  'Run collection',
  'Add request',
  'Add folder',
  'Delete',
];

const ITEM_HEIGHT = 50;

export default function Collection({ collections }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     <div className='collection_container'>
      {collections.map(collection => (
        <div key={collection.id} className='collection_list'>
          <button className='collection_list_btn'><ChevronRightIcon /></button>
          <button className='collection_list_name'>{collection.name}</button>
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
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
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