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
              <WorkspaceList list={workspaceList} />
            ) : (
              <p>Create a Workspace using the 'New' button on the left</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
