import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/workspace.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useData } from '../contexts/DataContext';

export default function Workspace(props) {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { workspaceData, setWorkspaceData } = useData('');
  // const [workspaceData, setWorkspaceData] = useState({
  //   id: 0,
  //   name: '',
  //   description: '',
  // });
  const [isEditingDescription, setEditingDescription] = useState(false);

  // 컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    //해당 workspace가 로컬스토리지에 존재할 경우
    if (workspaceId !== ':workspaceId') {
      const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
      const workspace = workspaceData ? JSON.parse(workspaceData) : null;

      if (workspace) {
        setWorkspaceData(workspace);
      }
    } else {
      // workspace를 새로 만들 경우
      let maxId = 0;
      for (let i = 0; i <= localStorage.length; i++) {
        const key = localStorage.key(i);
        //workspace 데이터인 경우
        if (key && key.startsWith('workspace-')) {
          //workspace의 Id를 파싱
          const id = parseInt(key.replace('workspace-', ''), 10);
          //Id가 유효하고, maxId보다 클경우
          if (!isNaN(id) && id > maxId) {
            maxId = id;
          }
        }
      }

      const nextId = maxId + 1;

      setWorkspaceData({ id: nextId, name: '', description: '' });
    }
  }, [workspaceId]);

  // workspace 이름 변경될 때
  const handleNameChange = (e) => {
    const newWorkspaceName = e.target.value;
    setWorkspaceData((prevData) => ({
      ...prevData,
      name: newWorkspaceName,
    }));
    //변경된 데이터 로컬스토리지에 저장
    saveWorkspaceDataToLocalStorage({
      ...workspaceData,
      name: newWorkspaceName,
    });

    navigate(`/workspaces/${workspaceData.id}`);
  };

  //description 변경될 때
  const handleDescriptionChange = (e) => {
    const newDescriptionText = e.target.value;
    setWorkspaceData((prevData) => ({
      ...prevData,
      description: newDescriptionText,
    }));
    //변경된 데이터 로컬스토리지에 저장
    saveWorkspaceDataToLocalStorage({
      ...workspaceData,
      description: newDescriptionText,
    });

    navigate(`/workspaces/${workspaceData.id}`);
  };

  // //입력필드에서 포커스 잃었을 때
  // const handleDescriptionBlur = () => {
  //   setEditingDescription(false);
  //   //편집된 데이터 로컬스토리지에 저장
  //   saveWorkspaceDataToLocalStorage(workspaceData);
  // };

  //description 편집하기 위한 버튼 클릭
  const handleNotesClick = () => {
    //편집 모드 활성화
    setEditingDescription(true);
  };

  //workspace 로컬스토리지에 저장
  const saveWorkspaceDataToLocalStorage = (data) => {
    if (data.name && data.description) {
      localStorage.setItem(`workspace-${data.id}`, JSON.stringify(data));
    } else {
      alert('workspace name을 입력하세요');
    }
  };

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
                value={workspaceData.description}
                onChange={handleDescriptionChange}
                // onBlur={handleDescriptionBlur}
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
