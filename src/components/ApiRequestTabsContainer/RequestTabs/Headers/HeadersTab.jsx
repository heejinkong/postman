import React from 'react';
import '../../../../style/headertab.scss';
import QueryParams from '../Params/QueryParams';

export default function HeadersTab() {
  return (
    <div className="header_container">
      <div className="header_editor_title">
        <span>Headers</span>
      </div>
      <QueryParams />
    </div>
  );
}
