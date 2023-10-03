import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export default function Workspace(props) {
  const { workspaceId } = useParams();
  const [workspaceData, setWorkspaceData] = useState({
    id: 0,
    name: '',
    description: '',
  });
  const [isEditingDescription, setEditingDescription] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (workspaceId !== 'new') {
      const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
      const workspace = workspaceData ? JSON.parse(workspaceData) : null;

      if (workspace) {
        setWorkspaceData(workspace);
      }
    } else {
      let nextId = 1;
      while (localStorage.getItem(`workspace-${nextId}`)) {
        nextId++;
      }
      setWorkspaceData({ id: nextId, name: '', description: '' });
    }
  }, [workspaceId]);

  const handleNameChange = (e) => {
    const newWorkspaceName = e.target.value;
    setWorkspaceData((prevData) => ({
      ...prevData,
      name: newWorkspaceName,
    }));
    saveWorkspaceDataToLocalStorage({
      ...workspaceData,
      name: newWorkspaceName,
    });
  };

  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setWorkspaceData((prevData) => ({
      ...prevData,
      description: newDescriptionText,
    }));
    saveWorkspaceDataToLocalStorage({
      ...workspaceData,
      description: newDescriptionText,
    });
  };

  const handleDescriptionBlur = () => {
    setEditingDescription(false);
    saveWorkspaceDataToLocalStorage(workspaceData);
  };
 
  const handleNotesClick = () => {
    setEditingDescription(true);
  };

  const saveWorkspaceDataToLocalStorage = (data) => {
    localStorage.setItem(`workspace-${data.id}`, JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let maxId = 0;
    for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('workspace-')) {
        const id = parseInt(key.replace('workspace-', ''), 10);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      }
    }

    const newId = maxId + 1;
    const workspaceDataToSave = { ...workspaceData, id: newId };
    saveWorkspaceDataToLocalStorage(workspaceDataToSave);

    setWorkspaceData(workspaceDataToSave);
    window.location.href = `/workspace/${newId}`;
  };

  const isWorkspaceRoute = location.pathname === `/workspace/${workspaceData.id}`;

  return (
    <div className="workspace_container">
      <div className="workspace_name_container">
        <PersonOutlineOutlinedIcon />
        <input
          type="text"
          name="workspacetitle"
          value={workspaceData.name}
          onChange={handleNameChange}
          placeholder="My Workspace"
        />

        {workspaceData.id < 1 ? (
          <button onClick={handleSubmit}>Save</button>
        ) : (
          <Link to={`/workspace/${workspaceData.id}?isForEdit=true`}></Link>
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
                value={workspaceData.description}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
              />
            ) : (
              <span>
                {workspaceData.description ||
                  'Add information that you want quick access to. It can include links to important resources or notes of what you want to remember.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
