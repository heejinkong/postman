import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { workspaceActions } from '../slice/workspaceSlice';

export default function Workspace(props) {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [nextId, setNextId] = useState(null);

  const { name, description } = useSelector((state) => ({
    name: state.workspaceReducers.name,
    description: state.workspaceReducers.description,
  }));

  useEffect(() => {
    if (name !== undefined && name !== null) {
      setWorkspaceName(name);
    }
    if (description !== undefined && description !== null) {
      setDescriptionText(description);
    }
  }, [name, description]);

  useEffect(() => {
    if (workspaceId !== ':workspaceId') {
      dispatch(workspaceActions.getWorkspace(workspaceId));
    } else {
      let maxId = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('workspace-')) {
          const id = parseInt(key.replace('workspace-', ''), 10);
          if (!isNaN(id) && id > maxId) {
            maxId = id;
          }
        }
      }
      const nextIdValue = maxId + 1;
      setNextId(nextIdValue);
    }
  }, [workspaceId, dispatch]);

  const handleNameChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //로컬스토리지에 workspace가 존재할 경우
    if (workspaceId !== `:workspaceId`) {
      const updatedWorkspace = {
        id: workspaceId,
        name: workspaceName,
        description: descriptionText,
      };
      //액션 디스패치
      dispatch(workspaceActions.updateWorkspace(updatedWorkspace));
    } else {
      const workspace = {
        id: nextId,
        name: workspaceName,
        description: descriptionText,
      };
      // 새로운 workspace를 만들 경우
      dispatch(workspaceActions.registerWorkspace(workspace));
    }
  };

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
        <button onClick={handleSubmit}>Save</button>
      </div>
      <div className="workspace_description">
        <div className="workspace_description_btn">
          <div className="workspace_description_title">
            <EventNoteOutlinedIcon /> Workspace description
          </div>
          <div
            className="workspace_description_notes"
            onClick={handleNotesClick}
          >
            {isEditingDescription ? (
              <textarea
                name="description"
                value={descriptionText}
                onChange={handleDescriptionChange}
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
