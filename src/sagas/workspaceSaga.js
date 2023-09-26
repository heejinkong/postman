import { call, put } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import history from "../utils/history";

export function* registerWorkspaceAsync(action) {
  const { workspace } = action.payload;

  localStorage.setItem(`workspace-${workspace.id}`, JSON.stringify(workspace));

  yield put(workspaceActions.registerWorkspace(workspace)); 

  history.push(`/workspace/${workspace.id}`);
}



export function* getWorkspaceAsync(action) {
  const { workspaceId } = action.payload;

  const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
  const workspace = workspaceData ? JSON.parse(workspaceData) : null;

  if (workspace) {
    yield put(workspaceActions.updateWorkspace(workspace));
  }
}

export function* fetchWorkspaceAsync(action) {
  const { workspaceId } = action.payload;

  const workspaceData = localStorage.getItem(`workspace-${workspaceId}`);
  const workspace = workspaceData ? JSON.parse(workspaceData) : null;

  if (workspace) {
    yield put(workspaceActions.updateWorkspace(workspace));
  } else {
    console.error("Workspace not found in localStorage");
  }
}

export function* updateWorkspaceAsync(action) {
  const workspace = action.payload;

  localStorage.setItem(`workspace-${workspace.id}`, JSON.stringify(workspace));

  yield call(() => history.push(`/workspace/${workspace.id}`));
}

export function* deleteWorkspaceAsync(action) {
  const { workspaceId } = action.payload;

  localStorage.removeItem(`workspace-${workspaceId}`);

  yield call(() => {
    history.push(`/`);
    history.go(0);
  });
}
