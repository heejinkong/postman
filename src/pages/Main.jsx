import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Workspace from './Workspace';
import { DataProvider } from '../contexts/DataContext';
import Header from '../components/Header';
import Request from './Request';
import Collection from '../pages/Collection';
import ListPage from './ListPage';
import RunCollection from './RunCollection';

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
            <Route path="/workspaces/:workspaceId" element={<Workspace />} />
            <Route
              path="/workspaces/:workspaceId/collections/:collectionId"
              element={<Collection />}
            />
            <Route
              path="/workspaces/:workspaceId/collections/:collectionId/:requestName"
              element={<Request />}
            />
            <Route
              path="/workspaces/:workspaceId/collections/:collectionId/runner"
              element={<RunCollection />}
            />
          </Routes>
        </div>
      </DataProvider>
    </section>
  );
}
