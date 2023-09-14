import React from "react";
import { Link } from "react-router-dom";

const WorkspaceList = (props) => {
  console.log(props.list);

  if (!props.list || props.list.length === 0) {
    alert("데이터없음");
    return null;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((workspace) => (
            <tr key={workspace.id}>
              <td>{workspace.id}</td>
              <td>
                <Link to={`/workspace/${workspace.id}`}>{workspace.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkspaceList;
