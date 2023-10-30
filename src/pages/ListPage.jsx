import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/listpage.scss';
import WorkspaceList from '../components/WorkspaceList';
import { workspaceListActions } from '../slice/workspaceListSlice';

export default function ListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(workspaceListActions.getWorkspaceList());
  }, [dispatch]);

  const { workspaceList } = useSelector((state) => ({
    workspaceList: state.workspaceListReducers.workspaceList,
  }));

  // workspace 삭제 처리
  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm('해당 Workspace를 삭제하시겠습니까 ?')) return false;

    localStorage.removeItem(`workspace-${workspaceId}`);
  };

  return (
    <div>
      <div className="home_editor_container">
        <div className="home_path_container">
          <div className="home_path_title"></div>
        </div>
        <div className="home_description">
          <div className="home_title">
            {workspaceList.length > 0 ? (
              <p>Click a Workspace</p>
            ) : (
              <p>Workspace does not exist</p>
            )}
          </div>
          <div className="home_description_notes">
            {workspaceList.length > 0 ? (
              <WorkspaceList
                list={workspaceList}
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
