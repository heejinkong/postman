import React from 'react';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Builder from '../components/Builder';
import ResponseSuccess from '../components/ResponseSuccess';



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
         {/* <Workspace/> */}
         {/* <CollectionEditor/> */}
      </div>
    </section>
  );
}
