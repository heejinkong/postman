import React, { useState } from 'react';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export default function Workspace() {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [noteText, setNoteText] = useState(''); 

  const handleDescriptionButtonClick = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <div className='workspace_container'>
      <div className='workspace_name_container'>
        <PersonOutlineOutlinedIcon /> My Workspace
      </div>
      <div className='workspace_description'>
        <button
          className={`workspace_description_btn ${isDescriptionVisible ? 'active' : ''}`}
          onClick={handleDescriptionButtonClick}
        >
          <div className='workspace_description_title'>
            <EventNoteOutlinedIcon /> Workspace description
          </div>
          <div className='workspace_description_notes'>
            <span>Add information that you want quick access to. It can include links to important resources or notes of what you want to remember.</span>
          </div>

          {/* {isDescriptionVisible ? (
            <div className='worspace_description_input'>
              <textarea
                placeholder='Add information that you want quick access to. It can include links to important resources or notes of what you want to remember.'
                value={noteText}
                onChange={handleNoteChange}
              />
            </div>
          ) : null} */}
        </button>
      </div>
    </div>
  );
}
