import React, { useState, useEffect } from 'react';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { workspaceActions } from '../slice/workspaceSlice';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '@mui/material';




export default function Workspace(props) {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const [workspaceName, setWorkspaceName] = useState('');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [isForUpdate, setIsForUpdate] = useState(false);
  const stateForProps = useSelector((state) => state.workspaceReducers);
  const location = useLocation();

  const { id ,name, description } = useSelector(
    (state) => ({
      id: state.workspaceReducers.id,
    name: state.workspaceReducers.name,
    description: state.workspaceReducers.description,
  }),
  shallowEqual
  );
 
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
    if(isForUpdate) {
      dispatch(workspaceActions.updateWorkspace(workspace));
    } else {
      dispatch(workspaceActions.registerWorkspace(workspace));
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("isForEdit") === "true") {
      setIsForUpdate(true);
      dispatch(workspaceActions.fetchWorkspace(workspaceId));
      
    }
    console.log(name, description);
    // setWorkspaceName(name);
    // setDescriptionText(description);
  }, [id, location]);

  

  useEffect(() => {
    dispatch(workspaceActions.getWorkspace(workspaceId));
  }, [dispatch, workspaceId]);

  

  useEffect(() => {
    if (name !== undefined && name !== null) {
      setWorkspaceName(name);
    }
    if (description !== undefined && description !== null) {
      setDescriptionText(description);
    }
  }, [name, description]);

  

  return (
    <div className='workspace_container'>
      <div className='workspace_name_container'>
        <PersonOutlineOutlinedIcon /> 
        <input
                type='text'
                name='workspacetitle'
                value={workspaceName}
                onChange={handleNameChange}
                placeholder='My Workspace'
          />
          <button onClick={handleSubmit}>save</button>
          { id > 0 ? (
                     <Link to={`/workspace/${id}?isForEdit=true`}>
                     <button type="primary">edit</button>
                     </Link>
        
                ) : (
                    <p>  </p>
                )}
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
