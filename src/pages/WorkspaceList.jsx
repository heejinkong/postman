import React from "react";
import { Link } from "react-router-dom";

const WorkspaceList = (props) => {
  return (
    <div>
      <table>
      <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="10%" />
            <col width="40%" />
          </colgroup>
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
