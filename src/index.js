import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
);

reportWebVitals();
