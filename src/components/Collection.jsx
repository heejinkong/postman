import React from 'react';
import '../style/collection.scss'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
    'Move',
    'Ru collection',
    'Add request',
    'Add folder',
    'Delete',
  ];

  const ITEM_HEIGHT = 50;

export default function Collection() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='collection_container'>
        <div className='collection_list'>
            <button className='collection_list_btn'><ChevronRightIcon /></button>
            <button className='collection_list_name'>New Collection</button>
            <div className="collection_list_options" style={{ opacity: open ? 1 : 0 }}>

            <IconButton
            disableRipple  // 이 prop을 추가하여 마우스 오버 효과 비활성화
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
    </div>
  );
}
