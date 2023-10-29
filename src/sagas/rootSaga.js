
import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";

import { getWorkspaceAsync, registerWorkspaceAsync, updateWorkspaceAsync  } from "./workspaceSaga";
import { workspaceListActions } from "../slice/workspaceListSlice";
import { getWorkspaceListAsync } from "./workspaceListSaga";




const { registerWorkspace, getWorkspace, updateWorkspace } = workspaceActions;
const  { getWorkpaceList } = workspaceListActions

export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeLatest(updateWorkspace.type, updateWorkspaceAsync);
  yield takeEvery( getWorkspaceListAsync, getWorkspaceListAsync)
}