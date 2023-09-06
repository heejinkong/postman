import  { useState, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import axios from 'axios';
import { Controlled as ControlledCodeMirror } from 'react-codemirror2';
import '../../style/codemirror.scss';



export default function ResponseBodyTabs() {
  const [result, setResult] = useState('');

  const fetchApi = async () => {
    try {
      const response = await axios.get('https://httpbin.org/get');
      console.log(response);

      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      {/* <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
        />
        <button onClick={fetchApi}>Send Request</button>
      </div> */}
      <div style={{ marginTop: '0.1px' }}>
        <ControlledCodeMirror
          value={result}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={() => {}}
          className="custom-codemirror"
        />
      </div>
    </div>
  );
}
