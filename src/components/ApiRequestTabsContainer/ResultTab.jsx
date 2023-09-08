import React from 'react';
import '../../style/resulttab.scss';
import { useData } from '../../contexts/DataContext';

export default function ResultTab() {
  const { resultText, setTextInput } = useData(); 

  const handleTextareaChange = (e) => {
    setTextInput(e.target.value); 
  };

  return (
    <div className='result_container'>
      <textarea
        value={resultText}
        onChange={handleTextareaChange}
        // style={{ fontWeight: 'bold' }}
      ></textarea>
    </div>
  );
}
