
import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";

import { getWorkspaceAsync, registerWorkspaceAsync, updateWorkspaceAsync, deleteWorkspaceAsync  } from "./workspaceSaga";
import { workspaceListActions } from "../slice/workspaceListSlice";
import { getWorkspaceListAsync } from "./workspaceListSaga";
import { registerCollectionAsync, getCollectionAsync, updateCollectionAsync } from "./collectionSaga";
import { collectionActions } from "../slice/collectionSlice";



const { registerWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } = workspaceActions;
const  { getWorkspaceList } = workspaceListActions
const { registerCollection, getCollection, updatecollection } = collectionActions;

// 여러 액션을 감시 및 처리
export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeLatest(updateWorkspace.type, updateWorkspaceAsync);
  yield takeEvery(getWorkspaceList.type, getWorkspaceListAsync);
  yield takeLatest(deleteWorkspace.type, deleteWorkspaceAsync);
  yield takeLatest(registerCollection.type, registerCollectionAsync) 
  yield takeEvery(getCollection.type, getCollectionAsync); 
  yield takeLatest(updatecollection.type, updateCollectionAsync)

}