import React, { useEffect, useState } from 'react';
import '../style/listpage.scss';
import WorkspaceList from './WorkspaceList';

const ListPage = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const getListFromLocalStorage = () => {
      const workspaceData = Object.keys(localStorage)
        .filter((key) => key.startsWith("workspace-"))
        .map((key) => JSON.parse(localStorage.getItem(key)));

      if (workspaceData.length > 0) {
        setList(workspaceData);
        setIsSuccess(true);
      }

      setIsLoading(false);
    };

    getListFromLocalStorage();
  }, []);

  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm("해당 Workspace를 삭제하시겠습니까 ?")) return false;

    // 로컬 스토리지에서 Workspace 데이터 삭제
    localStorage.removeItem(`workspace-${workspaceId}`);

    // 작업 목록 업데이트
    setList((prevList) => prevList.filter((workspace) => workspace.id !== workspaceId));
  };

  return (
    <div>
      <div className='home_editor_container'>
        <div className='home_path_container'>
          <div className='home_path_title'></div>
        </div>
        <div className='home_description'>
          <div className='home_title'>
            {isSuccess && list.length > 0 ? (
              <p>Click a Workspace</p>
            ) : (
              <p>Workspace does not exist</p>
            )}
          </div>
          <div className='home_description_notes'>
            {isSuccess && list.length > 0 ? (
              <WorkspaceList list={list} handleDeleteClick={handleDeleteClick} />
            ) : (
              <p>Create a Workspace using the 'New' button on the left</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
