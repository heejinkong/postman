import axios from "axios";
import history from "../utils/history";
import { collectionActions } from "../slice/collectionSlice";
import { put } from 'redux-saga/effects';

export function* registerCollectionAsync(action) {
    const data = action.payload;

    try {
        const response = yield axios.post(`http://localhost:4000/collection/`,data);
        yield alert("저장");
        console.log(response.data.id);
        history.push(`/workspace/:workspaceId/collection/${response.data.id}`, response.data.id);

        // history.go(0);
      } catch (e) {
        console.error("에러 발생:", e);
      }
    }

export function* getCollectionsAsync(action) {
    const workspaceId = action.payload;
    console.log(action.payload);

    try {
        const response = yield axios.get(`http://localhost:4000/collection?workspaceId=${workspaceId}`);

        yield put(collectionActions.getCollectionsAsync(response.data)); 
      } catch (e) {
        console.error("에러 발생:", e);
      }
    }
  