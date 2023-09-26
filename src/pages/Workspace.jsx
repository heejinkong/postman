import React, { useState, useEffect } from 'react';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { workspaceActions } from '../slice/workspaceSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Workspace(props) {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const [workspaceName, setWorkspaceName] = useState('');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [isForUpdate, setIsForUpdate] = useState(false);
  const location = useLocation();

  const { id, name, description } = useSelector(
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

  const handleDescriptionChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
  };

  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workspace = { id: workspaceId, name: workspaceName, description: descriptionText };
  
    if (id > 0) {
      // If id is already set, dispatch an update
      dispatch(workspaceActions.updateWorkspace(workspace));
    } else {

      dispatch(workspaceActions.registerWorkspace(workspace));
    }
    localStorage.setItem(`workspace-${workspaceId}`, JSON.stringify(workspace));
  };
  
  useEffect(() => {
    dispatch(workspaceActions.getWorkspace(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
    const workspace = workspaceData ? JSON.parse(workspaceData) : null;

    if (workspace) {
      setWorkspaceName(workspace.name);
      setDescriptionText(workspace.description);
    }
  }, [dispatch, workspaceId]);

  return (
    <div className="workspace_container">
      <div className="workspace_name_container">
        <PersonOutlineOutlinedIcon />
        <input
          type="text"
          name="workspacetitle"
          value={workspaceName}
          onChange={handleNameChange}
          placeholder="My Workspace"
        />

        {id > 0 ? (
          <Link to={`/workspace/${workspaceId}?isForEdit=true`}></Link>
        ) : (
          <button onClick={handleSubmit}>save</button>
        )}
      </div>
      <div className="workspace_description">
        <div className="workspace_description_btn">
          <div className="workspace_description_title">
            <EventNoteOutlinedIcon /> Workspace description
          </div>
          <div className="workspace_description_notes" onClick={handleNotesClick}>
            {isEditingDescription ? (
              <textarea
                name="description"
                value={descriptionText}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>
                {descriptionText ||
                  'Add information that you want quick access to. It can include links to important resources or notes of what you want to remember.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
