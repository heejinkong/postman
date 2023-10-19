import React from 'react';
import Builder from '../components/ApiRequestTabsContainer/Builder';
import ResponseSuccess from '../components/ResponseContainer/ResponseSuccess';
import '../style/request.scss';

export default function Request() {
  return (
    <div className="request-container">
      <div className="builder">
        <Builder />
      </div>
      <div className="response">
        <ResponseSuccess />
      </div>
    </div>
  );
}
