import React, { useState } from 'react';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { workspaceActions } from '../slice/workspaceSlice';
import { useDispatch } from "react-redux";




export default function Workspace() {
  const [workspaceName, setWorkspaceName] = useState('My Workspace');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const dispatch = useDispatch();


  const handleNameChange = (e) => {
    setWorkspaceName(e.target.value);
  };
  console.log(workspaceName);

  const handleDescriptionChange = (e) => {
    setDescriptionText(e.target.value);
  };
  console.log(descriptionText);

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
  };

  const handleNotesClick = () => {
    setEditingDescription(true);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const workspace = { name: workspaceName, description: descriptionText };
    // console.log(workspace);
    dispatch(workspaceActions.registerWorkspace(workspace));
  }



  return (
    <div className='workspace_container'>
      
      <div className='workspace_name_container'>
        <PersonOutlineOutlinedIcon /> 
        <input
                type='text'
                name='workspacetitle'
                value={workspaceName}
                onChange={handleNameChange}
          />
          <button onClick={handleSubmit}>save</button>
      </div>
      <div className='workspace_description'>
        <div className='workspace_description_btn'>
          <div className='workspace_description_title'>
            <EventNoteOutlinedIcon /> Workspace description
          </div>
          <div className='workspace_description_notes' onClick={handleNotesClick}>
            {isEditingDescription ? (
              <textarea
                name='description'
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
