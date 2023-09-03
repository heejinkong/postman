import React from 'react';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Workspace from './Workspace';
import CollectionEditor from './CollectionEditor';
import { Route, Routes } from 'react-router-dom';
import Builder from "../components/Builder";
import ResponseSuccess from "../components/ResponseSuccess"

export default function Main() {
  return (
    <section className="container">
      <div className="header"> header </div>
      <Sidebar />
      <div className="main_container">
         <div className="builder">
          <Builder/>
        
         </div> 
         <div className="response">
          <ResponseSuccess/>          
         </div> 
         {/* <Routes>
          <Route path='/' element = {<Workspace/>}/>
          <Route path='/collection' element = {<CollectionEditor/>}/>
         </Routes> */}
      </div>
    </section>
  );
}
