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
        placeholder="Enter your code here..."
        // style={{ fontWeight: 'bold' }}
      ></textarea>
    </div>
  );
}
