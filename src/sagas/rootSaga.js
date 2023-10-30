
import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";

import { getWorkspaceAsync, registerWorkspaceAsync, updateWorkspaceAsync, deleteWorkspaceAsync  } from "./workspaceSaga";
import { workspaceListActions } from "../slice/workspaceListSlice";
import { getWorkspaceListAsync } from "./workspaceListSaga";




const { registerWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } = workspaceActions;
const  { getWorkspaceList } = workspaceListActions

export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeLatest(updateWorkspace.type, updateWorkspaceAsync);
  yield takeEvery(getWorkspaceList.type, getWorkspaceListAsync);
  yield takeLatest(deleteWorkspace.type, deleteWorkspaceAsync);
}