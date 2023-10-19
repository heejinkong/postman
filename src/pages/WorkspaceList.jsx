import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkspaceList = (props) => {
  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm('Delete WorkspaceId ?')) return false;

    localStorage.removeItem(`workspace-${workspaceId}`);

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith(`collection-${workspaceId}-`)) {
        const collectionId = key.split('-')[2];
        for (let j = localStorage.length - 1; j >= 0; j--) {
          const requestKey = localStorage.key(j);
          if (requestKey.startsWith(`request-${collectionId}-`)) {
            localStorage.removeItem(requestKey);
          }
        }
        localStorage.removeItem(key);
      }
    }

    props.handleDeleteClick(workspaceId);
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
            <th style={{ paddingRight: '32px' }}>id</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((workspace) => (
            <tr key={workspace.id}>
              <td>{workspace.id}</td>
              <td>
                <Link
                  to={`/workspace/${workspace.id}`}
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
};

export default WorkspaceList;
