import React, { useEffect, useState } from "react";
import * as Diff2Html from "diff2html";
import '../../style/diff2html.css';

import { useData } from '../../contexts/DataContext';

export default function ResponseDiffTab() {
  const { resultText, resultData } = useData();

  const Diff = require("diff");

  const diff = Diff.createTwoFilesPatch(
    "예상값",
    "응답값",
    `${resultText}`,`${resultData}`
  );

  let outputHtml = Diff2Html.html(diff, {
    inputFormat: "diff",
    showFiles: true,
    matching: "lines",
    highlight: true,
    outputFormat: "side-by-side"
  });

  return (
    <div>
    <h2>Code Difference</h2>
    {/* diff 결과를 화면에 표시 */}
    <div dangerouslySetInnerHTML={{ __html: outputHtml }}></div>
  </div>

  );
}
