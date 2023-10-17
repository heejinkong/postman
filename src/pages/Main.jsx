import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Workspace from './Workspace';
import CollectionEditor from './CollectionEditor';
import { DataProvider } from '../contexts/DataContext';
import ListPage from './ListPage';
import Header from '../components/Header';
import Request from './Request';

export default function Main() {
  return (
    <section className="container">
      <DataProvider>
        <div className="header">
          <Header />
        </div>
        <Sidebar />
        <div className="main_container">
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/workspace/:workspaceId" element={<Workspace />} />
            <Route
              path="/workspace/:workspaceId/collection/:collectionId"
              element={<CollectionEditor />}
            />
            <Route
              path="/workspace/:workspaceId/collection/:collectionId/:requestName"
              element={<Request />}
            />
          </Routes>
        </div>
      </DataProvider>
    </section>
  );
}
