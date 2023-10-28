
import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";

import { getWorkspaceAsync, registerWorkspaceAsync, updateWorkspaceAsync  } from "./workspaceSaga";



const { registerWorkspace, getWorkspace, updateWorkspace } = workspaceActions;

export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeLatest(updateWorkspace.type, updateWorkspaceAsync);
}