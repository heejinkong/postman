import {  takeEvery, takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import { getWorkspaceAsync, registerWorkspaceAsync  } from "./workspaceSaga";
import { listActions } from "../slice/listSlice";
import { getListAsync } from "./listSaga";



const { registerWorkspace, getWorkspace } = workspaceActions;
const { getList } = listActions;


export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
  yield takeEvery(getWorkspace.type, getWorkspaceAsync);
  yield takeEvery(getList.type, getListAsync);
}