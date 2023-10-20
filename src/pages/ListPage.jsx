import React, { useEffect, useState } from 'react';
import '../style/listpage.scss';
import WorkspaceList from '../components/WorkspaceList';

export default function ListPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getListFromLocalStorage = () => {
      const workspaceData = Object.keys(localStorage)
        .filter((key) => key.startsWith('workspace-')) // 키 필터링
        .map((key) => JSON.parse(localStorage.getItem(key))); // JSON으로 파싱

      if (workspaceData.length > 0) {
        //데이터 존재하시 목록 업데이트
        setList(workspaceData);
      }
    };
    getListFromLocalStorage(); // 페이지 로드 시, 실행
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // workspace 삭제 처리
  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm('해당 Workspace를 삭제하시겠습니까 ?')) return false;

    localStorage.removeItem(`workspace-${workspaceId}`);

    // 목록 업데이트
    setList((prevList) =>
      prevList.filter((workspace) => workspace.id !== workspaceId)
    );
  };

  return (
    <div>
      <div className="home_editor_container">
        <div className="home_path_container">
          <div className="home_path_title"></div>
        </div>
        <div className="home_description">
          <div className="home_title">
            {list.length > 0 ? (
              <p>Click a Workspace</p>
            ) : (
              <p>Workspace does not exist</p>
            )}
          </div>
          <div className="home_description_notes">
            {list.length > 0 ? (
              <WorkspaceList
                list={list}
                handleDeleteClick={handleDeleteClick}
              />
            ) : (
              <p>Create a Workspace using the 'New' button on the left</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
