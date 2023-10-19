import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/responseheaderstab.scss';

export default function ResponseHeadersTab() {
  const [headers, setHeaders] = useState([]);

  const defaultHeaders = [
    { key: 'Date', value: '' },
    { key: 'Content-Type', value: '' },
    { key: 'Content-Length', value: '' },
    { key: 'Connection', value: '' },
    { key: 'Server', value: '' },
    { key: 'Access-Control-Allow-Origin', value: '' },
    { key: 'Access-Control-Allow-Credentials', value: '' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://httpbin.org/get');
        const responseHeaders = response.headers;
        console.log(responseHeaders);

        const headerArray = defaultHeaders.map((defaultHeader) => ({
          key: defaultHeader.key,
          value: responseHeaders[defaultHeader.key] || '',
        }));

        setHeaders(headerArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="headers_editor_container">
      <div className="headers_editor_header_row">
        <div className="headers_editor_top_header">
          <div className="headers_editor_key_header_row ">
            <div className="headers_form_header_row"></div>
            <div className="headers_header_row">
              <div className="headers_row">Key</div>
              <div className="headers_row">Value</div>
            </div>
          </div>
          {headers.map((header, index) => (
            <div className="headers_editor_key_header_row " key={index}>
              <div className="headers_form_header_row"></div>
              <div className="headers_header_row">
                <div className="headers_input_row">
                  <input
                    className="headers_row"
                    type="text"
                    placeholder="Key"
                    value={header.key}
                    readOnly
                  />
                </div>
                <div className="headers_input_row">
                  <input
                    className="headers_row"
                    type="text"
                    placeholder="Value"
                    value={header.value}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
