import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import { getWorkspaceAsync, registerWorkspaceAsync,  } from "./workspaceSaga";


const { registerWorkspace, getWorkspace } = workspaceActions;

export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
}