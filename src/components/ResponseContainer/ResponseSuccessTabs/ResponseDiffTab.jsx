import React from 'react';
import * as Diff2Html from 'diff2html';
import { useData } from '../../../contexts/DataContext';
import '../../../style/diff2html.css';

export default function ResponseDiffTab() {
  const { resultText, resultData } = useData();

  const Diff = require('diff');

  const diff = Diff.createTwoFilesPatch(
    '예상값',
    '응답값',
    `${resultText}`,
    `${resultData}`
  );

  let outputHtml = Diff2Html.html(diff, {
    inputFormat: 'diff',
    showFiles: true,
    matching: 'lines',
    highlight: true,
    outputFormat: 'side-by-side',
  });

  return (
    <div>
      {/* <h2>Code Difference</h2> */}
      <div>
        <div dangerouslySetInnerHTML={{ __html: outputHtml }}></div>
      </div>
    </div>
  );
}
