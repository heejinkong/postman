import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { workspaceActions } from "../slice/workspaceSlice";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkspaceList = (props) => {
  const dispatch = useDispatch(); 

  const handleDeleteClick = (id) => {
    if (!window.confirm("해당 Workspace를 삭제하시겠습니까 ?")) return false;
    dispatch(workspaceActions.deleteWorkspace(id)); 
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