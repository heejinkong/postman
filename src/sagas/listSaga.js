import { put } from "redux-saga/effects";
import { listActions } from "../slice/listSlice";
import axios from "axios";

export function* getListAsync() {
  try {
    const response = yield axios.get(`http://localhost:4000/workspace/`);
    yield put(listActions.getListAsync(response.data));
  } catch (error) {
    console.error("Error fetching list:", error);

  }
}
