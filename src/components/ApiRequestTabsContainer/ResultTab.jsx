import React, { useState } from 'react';
import '../../style/resulttab.scss';


export default function ResultTab() {
  const [predictedValue, setPredictedValue] = useState(""); // Define predictedValue state
  const handleTextareaChange = (event) => {
    setPredictedValue(event.target.value);
  };

  return (
    <div className='result_container'>
      <textarea
        value={predictedValue}
        onChange={handleTextareaChange}
        rows={17} 
        cols={165}
        placeholder="Enter the expected result here..." 
/>
    </div>
  );
}