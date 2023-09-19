import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import { fetchWorkspaceAsync, getWorkspaceAsync, registerWorkspaceAsync, updateWorkspaceAsync, deleteWorkspaceAsync  } from "./workspaceSaga";
import { listActions } from "../slice/listSlice";
import { getListAsync } from "./listSaga";



const { registerWorkspace, getWorkspace, fetchWorkspace, updateWorkspace, deleteWorkspace } = workspaceActions;
const { getList } = listActions;


export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeEvery(getList.type, getListAsync);
  yield takeEvery(fetchWorkspace.type, fetchWorkspaceAsync);
  yield takeLatest(updateWorkspace.type, updateWorkspaceAsync);
  yield takeLatest(deleteWorkspace.type, deleteWorkspaceAsync);
}