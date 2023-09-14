import { put } from "redux-saga/effects";
import { listActions } from "../slice/listSlice";
import axios from "axios";

export function* getListAsync() {
  const response = yield axios.get(`http://localhost:4000/list/`);

  yield put(listActions.getListAsync(response.data));
}