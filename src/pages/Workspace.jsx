import React, { useState } from 'react';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export default function Workspace() {
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');

  const handleDescriptionClick = () => {
    setEditingDescription(true);
  }

  const handleDescriptionChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
  };

  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  return (
    <div className='workspace_container'>
      <div className='workspace_name_container'>
        <PersonOutlineOutlinedIcon /> My Workspace
      </div>
      <div className='workspace_description'>
        <div className='workspace_description_btn'>
          <div
            className='workspace_description_title'
            onClick={handleDescriptionClick}
          >
            <EventNoteOutlinedIcon /> Workspace description
          </div>
          <div className='workspace_description_notes' onClick={handleNotesClick}>
            {isEditingDescription ? (
              <textarea
                value={descriptionText}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>{descriptionText || 'Add information that you want quick access to. It can include links to important resources or notes of what you want to remember.'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
