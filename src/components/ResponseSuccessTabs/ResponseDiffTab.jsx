import React, { useEffect, useState } from 'react';
import 'react-diff-view/style/index.css'; 
import { Diff } from 'react-diff-view'; 
import { useData } from '../../contexts/DataContext';

export default function ResponseDiffTab() {
  const { resultData, resultText } = useData();
  const [codeDiff, setCodeDiff] = useState('');

  useEffect(() => {
    const responseCode = resultData;
    const predictedCode = resultText;
    setCodeDiff({ responseCode, predictedCode });
  }, [resultText, resultData]);

  return (
    <div>
      <h2>Code Difference</h2>
      <Diff
        oldValue={codeDiff.responseCode}
        newValue={codeDiff.predictedCode}
        splitView={true} 
        useDarkTheme={false} 
      />
    </div>
  );
}
