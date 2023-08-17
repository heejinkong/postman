import React from 'react';
import '../style/sidebar.scss';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';


export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <IconButton aria-label="plus">
            <AddIcon fontSize="small" />
          </IconButton>
          <div className='btn_area'>
            <button className="new_btn">New</button>
            <button className="import_btn">Import</button>
            <button className="export_btn">Export</button>
          </div>
        </div>
      </div>
    </div>
  );
}
