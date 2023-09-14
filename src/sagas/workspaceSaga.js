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

        history.push(`/workspace/${response.data.id}`, response.data.id);
    } catch (error) {
        console.error("에러 발생:", error);
    }
}

export function* getWorkspaceAsync(action) {
  const id = action.payload;

  const response = yield axios.get(`http://localhost:4000/workspace/${id}`);

  console.log(response.data);

  yield put(workspaceActions.getWorkspaceAsync(response.data));

}


