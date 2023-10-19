import React from 'react';
import '../../../../style/paramstab.scss';
import QueryParams from './QueryParams';

export default function ParamsTab() {
  return (
    <div className="params_container">
      <div className="params_editor_title">
        <span>Query Params</span>
      </div>
      <QueryParams />
    </div>
  );
}
