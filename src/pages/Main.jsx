import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import '../style/main.scss';
import Sidebar from '../components/Sidebar';
import Builder from '../components/Builder';
import ResponseSuccess from '../components/ResponseSuccess';
import Workspace from './Workspace';
import CollectionEditor from './CollectionEditor';
import { DataProvider } from '../contexts/DataContext';
import WorkspaceList from './WorkspaceList';
import ListPage from './ListPage';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import Request from './Request';

export default function Main() {
  return (
    <section className="container">
      <Provider store={store}>
        <DataProvider>
          <div className="header">
            <Header />
          </div>
          <Sidebar />
          <div className="main_container">
            {/* Collection , WorkSpace Router 처리. part 1. */}
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/workspace/:workspaceId" element={<Workspace />} />
              {/* <Route path="/workspace/:workspaceId" element={<WorkspaceEdit />} /> */}
              <Route
                path="/workspace/:workspaceId/collection/:collectionId"
                element={<CollectionEditor />}
              />
              <Route
                path="/workspace/:workspaceId/collection/:collectionId/request"
                element={<Request />}
              />
            </Routes>
          </div>
        </DataProvider>
      </Provider>
    </section>
  );
}
