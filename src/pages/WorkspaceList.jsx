import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkspaceList = (props) => {
  const handleDeleteClick = (workspaceId) => {
    if (!window.confirm("해당 Workspace를 삭제하시겠습니까 ?")) return false;

    // 로컬 스토리지에서 Workspace 데이터 삭제
    localStorage.removeItem(`workspace-${workspaceId}`);

    // 작업 목록 업데이트
    props.handleDeleteClick(workspaceId);
  };

  return (
    <div style={{ padding: "0 12px" }}>
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width="20%" />
          <col width="70%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th style={{ paddingRight: "32px" }}>id</th>
            <th>Title</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((workspace) => (
            <tr key={workspace.id}>
              <td>{workspace.id}</td>
              <td>
                <Link to={`/workspace/${workspace.id}`} style={{ textDecoration: 'none', color: 'black' }}>{workspace.name}</Link>
              </td>
              <td style={{ paddingLeft: "100px" }}>
                <IconButton onClick={() => handleDeleteClick(workspace.id)} aria-label="delete">
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
