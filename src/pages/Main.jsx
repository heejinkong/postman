import React from 'react';
import '../style/main.scss';
// import { Link, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Workspace from './Workspace';
// import Params from '../components/Params';


export default function Main() {
  return (
    <section className="container">
      <div className="header"> header </div>
      <Sidebar />
      <div className="main_container">
         {/* <div className="builder">
          <Builder/>
        
         </div> 
         <div className="response">
          <Response/>          
         </div>  */}
         <Workspace/>
      </div>
    </section>
  );
}
