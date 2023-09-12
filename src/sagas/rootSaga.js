import { takeLatest } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import { registerWorkspaceAsync } from "./workspaceSaga";


const { registerWorkspace } = workspaceActions;

export default function* rootWatcher() {
  yield takeLatest(registerWorkspace.type, registerWorkspaceAsync);
}