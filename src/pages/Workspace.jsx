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
    const newWorkspaceName = e.target.value;
    setWorkspaceName(newWorkspaceName);

    // LocalStorage에서 해당 workspaceId의 데이터를 가져옵니다.
    const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
    if (workspaceData) {
      const workspace = JSON.parse(workspaceData);
      workspace.name = newWorkspaceName;

      // 수정된 workspace 데이터를 다시 LocalStorage에 저장합니다.
      localStorage.setItem(`workspace-${workspaceId}`, JSON.stringify(workspace));
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setDescriptionText(newDescriptionText);

    // LocalStorage에서 해당 workspaceId의 데이터를 가져옵니다.
    const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
    if (workspaceData) {
      const workspace = JSON.parse(workspaceData);
      workspace.description = newDescriptionText;

      // 수정된 workspace 데이터를 다시 LocalStorage에 저장합니다.
      localStorage.setItem(`workspace-${workspaceId}`, JSON.stringify(workspace));
    }
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

    localStorage.setItem(`workspace-${workspaceId}`, JSON.stringify(workspace));

    if (isForUpdate) {
      dispatch(workspaceActions.updateWorkspace(workspace));
    } else {
      dispatch(workspaceActions.registerWorkspace(workspace));
    }

    // 워크스페이스 정보를 업데이트한 후 현재 워크스페이스 페이지로 리다이렉트
    window.location.href = `/workspace/${workspaceId}`;
  };

  useEffect(() => {
    const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
    const workspace = workspaceData ? JSON.parse(workspaceData) : null;

    if (workspace) {
      setWorkspaceName(workspace.name);
      setDescriptionText(workspace.description);
    }
  }, [dispatch, workspaceId]);

  const isWorkspaceRoute = location.pathname === `/workspace/:workspaceId`;

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

        {isWorkspaceRoute ? (
          <button onClick={handleSubmit}>save</button>
        ) : (
          <Link to={`/workspace/${workspaceId}?isForEdit=true`}></Link>
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
