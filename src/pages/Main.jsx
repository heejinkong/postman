import React from 'react';
import '../style/main.scss';
// import { Link, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Builder from '../components/Builder';
import Response from '../components/Response';
import CollectionEdit from './CollectionEdit';
// import Params from '../components/Params';
// import Header from '../components/Header';
// import Body from '../components/Body';
// import Setting from '../components/Setting';

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
         <CollectionEdit/>
      </div>
    </section>
  );
}
