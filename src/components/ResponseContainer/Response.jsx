import React from 'react';
import '../../style/response.scss';

export default function Response() {
  return (
    <div className="response_container">
      <div className="response_title">
        <span>Response</span>
      </div>
      <div className="response_empty">
        <span>Enter the URL and click Send to get a response</span>
      </div>
    </div>
  );
}
