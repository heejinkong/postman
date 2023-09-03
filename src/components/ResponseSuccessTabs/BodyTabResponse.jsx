import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Controlled as ControlledCodeMirror } from 'react-codemirror2';

export default function ExampleKong() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');

  const fetchApi = async () => {
    console.log('hi');
    try {
      const result = await axios.get('/listing');

      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
        />
        <button onClick={fetchApi}>Send Request</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <ControlledCodeMirror
          value={response}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={() => {}}
        />
      </div>
    </div>
  );
}
