import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export default function Workspace(props) {
  const { workspaceId } = useParams(); 
  const [id, setId] = useState(0); // 초기 id 값을 0으로 설정
  const [workspaceName, setWorkspaceName] = useState('');
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const location = useLocation();

  // 페이지 로드 시 로컬 스토리지에서 데이터 읽어오기
useEffect(() => {
  if (workspaceId !== 'new') {
    const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
    const workspace = workspaceData ? JSON.parse(workspaceData) : null;

    if (workspace) {
      setId(workspace.id);
      setWorkspaceName(workspace.name);
      setDescriptionText(workspace.description);
    }
  } else {
    // "new" 경로로 들어온 경우, 새로운 id를 동적으로 할당합니다.
    let nextId = 1;
    while (localStorage.getItem(`workspace-${nextId}`)) {
      nextId++;
    }
    setId(nextId);
  }
}, [workspaceId]);


  const handleNameChange = (e) => {
    const newWorkspaceName = e.target.value;
    setWorkspaceName(newWorkspaceName);

    const workspaceData = localStorage.getItem(`workspace-${id}`);
    if (workspaceData) {
      const workspace = JSON.parse(workspaceData);
      workspace.name = newWorkspaceName;
      localStorage.setItem(`workspace-${id}`, JSON.stringify(workspace));
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setDescriptionText(newDescriptionText);

    const workspaceData = localStorage.getItem(`workspace-${id}`);
    if (workspaceData) {
      const workspace = JSON.parse(workspaceData);
      workspace.description = newDescriptionText;
      localStorage.setItem(`workspace-${id}`, JSON.stringify(workspace));
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
  
    // 로컬 스토리지에서 현재 가장 큰 ID를 찾기
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
  
    // 새로운 ID 계산
    const newId = maxId + 1;
  
    const workspace = { id: newId, name: workspaceName, description: descriptionText };
  
    localStorage.setItem(`workspace-${newId}`, JSON.stringify(workspace));
  
    // `id` 상태를 업데이트합니다.
    setId(newId);
  
    // 워크스페이스 정보를 업데이트한 후 현재 워크스페이스 페이지로 리다이렉트
    window.location.href = `/workspace/${newId}`;
  };
  
  


  const isWorkspaceRoute = location.pathname === `/workspace/${id}`;

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

        {id < 1 ? (
          <button onClick={handleSubmit}>save</button>
        ) : (
          <Link to={`/workspace/${id}?isForEdit=true`}></Link>
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
