import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Builder from "../components/Builder";
import ResponseSuccess from "../components/ResponseSuccess"
import Workspace from './Workspace';
import CollectionEditor from './CollectionEditor';
import { DataProvider } from '../contexts/DataContext';
import WorkspaceEdit from './WorkspaceEdit';
import WorkspaceList from './WorkspaceList';
import ListPage from './ListPage';
import Header from '../components/Header';


export default function Main() {
  return (
    <section className="container">
      <DataProvider>
      <div className="header"> 
      <Header/>
      </div>
      <Sidebar />
      <div className="main_container">
         {/* <div className="builder">
          <Builder/>
        
         </div> 
         <div className="response">
          <ResponseSuccess/>          
         </div>  */}
         <Routes>
         <Route path="/" element={<ListPage />} />
          <Route path="/workspace/:workspaceId" element={<Workspace />} />
          {/* <Route path="/workspace/:workspaceId" element={<WorkspaceEdit />} /> */}
          <Route path='/collection' element = {<CollectionEditor/>}/>
         </Routes>
      </div>
      </DataProvider>
    </section>
  );
}
