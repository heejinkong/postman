import { put } from "redux-saga/effects";
import { listActions } from "../slice/listSlice";

export function* getListAsync() {
  try {
    const workspaceData = Object.keys(localStorage)
      .filter((key) => key.startsWith("workspace-"))
      .map((key) => JSON.parse(localStorage.getItem(key)));

    yield put(listActions.getListAsync(workspaceData));
  } catch (error) {
    console.error("Error fetching list:", error);
  }
}
