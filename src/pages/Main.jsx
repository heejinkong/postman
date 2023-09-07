import React from 'react';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Builder from "../components/Builder";
import ResponseSuccess from "../components/ResponseSuccess"
import { DataProvider } from '../contexts/DataContext';

export default function Main() {
  return (
    <section className="container">
      <DataProvider>
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
      </DataProvider>
    </section>
  );
}
