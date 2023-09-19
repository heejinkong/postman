import { put } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";
import axios from "axios";
import history from "../utils/history";

export function* registerWorkspaceAsync(action) {
  const data = action.payload;

  try {
    const response = yield axios.post('http://localhost:4000/workspace/', data);
    yield alert("저장");
    console.log(response.data.id);

    yield put(workspaceActions.updateWorkspace(response.data));

    history.push(`/workspace/${response.data.id}`);
  } catch (e) {
    console.error("에러 발생:", e);
  }
}

export function* getWorkspaceAsync(action) {
  const id = action.payload;

  try {
    const response = yield axios.get(`http://localhost:4000/workspace/${id}`);


    yield put(workspaceActions.updateWorkspace(response.data));
  } catch (e) {
    console.error("에러 발생:", e);
  }
}

export function* fetchWorkspaceAsync(action) {
  console.log(action);
  const id = action.payload;

  try {
    const response = yield axios.get(`http://localhost:4000/workspace/${id}`);

    yield put(workspaceActions.updateWorkspace(response.data));
  } catch (e) {
    console.error("에러 발생:", e);
  }
}

export function* updateWorkspaceAsync(action) {
  const workspace = action.payload;
  
  try {
    const response = yield axios.put(`http://localhost:4000/workspace/${workspace.id}`, workspace);
    
    history.push(`/workspace/${response.data.id}`, response.data.id);
    console.log(response.data.name)
    console.log(response.data.description)
  } catch (e) {
    console.error("에러 발생:", e);
  }
}

export function* deleteWorkspaceAsync(action) {
  const id = action.payload;

  yield axios.delete(`http://localhost:4000/workspace/${id}`);
  alert("삭제");
  history.push(`/`);
  history.go(0);
}
