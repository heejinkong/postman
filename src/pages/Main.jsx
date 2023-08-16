import React from 'react';
import '../style/main.scss';
import { Link, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Params from '../components/Params';
import Header from '../components/Header';
import Body from '../components/Body';
import Setting from '../components/Setting';

export default function Main() {
  return (
    <section className="container">
      <div className="header"> header </div>
      <Sidebar />
      <div className="main_container">
        <div className="builder">
          <div className="topEle">
            <Link to="/params" className="link">
              Params
            </Link>
            <Link to="/header" className="link">
              Header
            </Link>
            <Link to="/body" className="link">
              Body
            </Link>
            <Link to="/link" className="link">
              Settings
            </Link>
          </div>
          <div className="bt-top">
            <Routes>
              <Route path="/params" element={<Params />} />
              <Route path="/header" element={<Header />} />
              <Route path="/body" element={<Body />} />
              <Route path="/link" element={<Setting />} />
            </Routes>
          </div>
        </div>
        <div className="response">3</div>
      </div>
    </section>
  );
}
