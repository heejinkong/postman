import React, { useState } from 'react';
import '../../style/resulttab.scss';




export default function ResultTab() {
  const [resultText, setResultText] = useState('');

  const handleTextareaChange = (e) => {
    setResultText(e.target.value);
  };

  return (
    <div>
      <textarea onChange={handleTextareaChange} value={resultText} />
    </div>
  );
}