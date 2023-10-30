import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { workspaceActions } from '../slice/workspaceSlice';

export default function WorkspaceList(props) {
  const [workspaces, setWorkspaces] = useState(props.list);
  const dispatch = useDispatch();

  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm('해당 Workspace를 삭제하시겠습니까 ?')) return false;
    dispatch(workspaceActions.deleteWorkspace(workspaceId));
    // // 연관된 collection과 request 데이터 삭제
    // for (let i = localStorage.length - 1; i >= 0; i--) {
    //   const key = localStorage.key(i);
    //   if (key && key.startsWith(`collection-${workspaceId}-`)) {
    //     const collectionId = key.split('-')[2];
    //     for (let j = localStorage.length - 1; j >= 0; j--) {
    //       const requestKey = localStorage.key(j);
    //       if (
    //         requestKey &&
    //         (requestKey.startsWith(`request-${collectionId}-`) ||
    //           requestKey.startsWith(`paramsData-${collectionId}-`))
    //       ) {
    //         localStorage.removeItem(requestKey);
    //       }
    //     }
    //     localStorage.removeItem(key);
    //   }

    // 워크스페이스 목록에서 삭제된 워크스페이스를 제거
    // const updatedWorkspaces = workspaces.filter(
    //   (workspace) => workspace.id !== workspaceId
    // );
    // setWorkspaces(updatedWorkspaces);

    // 부모 컴포넌트로 삭제 이벤트를 전달
    // props.handleDeleteClick(workspaceId);
  };

  return (
    <div style={{ padding: '0 12px' }}>
      <table style={{ width: '100%' }}>
        <colgroup>
          <col width="20%" />
          <col width="70%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th style={{ paddingRight: '32px' }}></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map((workspace) => (
            <tr key={workspace.id}>
              <td>
                <PeopleAltOutlinedIcon />
              </td>
              <td>
                <Link
                  to={`/workspaces/${workspace.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {workspace.name}
                </Link>
              </td>
              <td style={{ paddingLeft: '100px' }}>
                <IconButton
                  onClick={() => handleDeleteClick(workspace.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
