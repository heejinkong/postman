import React from "react";
import * as Diff2Html from "diff2html";
import '../../style/diff2html.css';

export default function ResponseDiffTab() {
  // 직접 diff 데이터 생성
  const diff = `diff --git a/sample.js b/sample.js
index 0000001..0ddf2ba
--- a/sample.js
+++ b/sample.js
@@ -1 +1 @@
-console.log("Hello World!")
+console.log("Hello from Diff2Html!")`;

  let outputHtml = Diff2Html.html(diff, {
    inputFormat: "diff",
    showFiles: true,
    matching: "lines",
    outputFormat: "side-by-side"
  });

  return (
    <div>
      <h2>Code Difference</h2>
      <div dangerouslySetInnerHTML={{ __html: outputHtml }}></div>
    </div>
  );
}
