//json 데이터 넘어오는지 확인용

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workspaceActions } from '../slice/workspaceSlice';
import { useParams } from 'react-router-dom';

const WorkspaceEdit = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  useEffect(() => {
    dispatch(workspaceActions.getWorkspace(workspaceId));
  }, [dispatch, workspaceId]);

  const { id, name, description } = useSelector((state) => ({
    id: state.workspaceReducers.id,
    name: state.workspaceReducers.name,
    description: state.workspaceReducers.description,
  }));

  return (
    <div>
      id : {id}
      <br />
      name : {name}
      <br />
      description : {description}
      <br />
    </div>
  );
};

export default WorkspaceEdit;
