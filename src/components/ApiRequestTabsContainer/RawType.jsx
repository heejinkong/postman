import React, { useState } from 'react';
import '../../style/rawtype.scss'


export default function RawType() {
    const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className='raw_container'>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows={10} // 원하는 행의 개수로 조정
        cols={80} // 원하는 열의 개수로 조정
        placeholder="Enter your code here..."
      />
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
