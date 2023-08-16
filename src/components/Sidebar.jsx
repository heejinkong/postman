import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="sidebar_list">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <IconButton aria-label="plus">
            <AddIcon fontSize="small" />
          </IconButton>
          <button className="new_btn">New</button>
          <button className="import_btn">Import</button>
          <button className="export_btn">Export</button>
        </div>
      </div>
    </div>
  );
}
