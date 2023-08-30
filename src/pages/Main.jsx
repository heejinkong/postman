import React from 'react';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Workspace from './Workspace';
import CollectionEditor from './CollectionEditor';


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
         {/* <Workspace/> */}
         <CollectionEditor/>
      </div>
    </section>
  );
}
