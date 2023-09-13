import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import store from './store';
import { Provider } from 'react-redux';
import history from "./utils/history";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>
  </Provider>
);

reportWebVitals();
