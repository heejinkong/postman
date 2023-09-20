import axios from "axios";
import history from "../utils/history";
import { collectionActions } from "../slice/collectionSlice";
import { put } from 'redux-saga/effects';

export function* registerCollectionAsync(action) {
    const data = action.payload;

    yield axios.post(`http://localhost:4000/collection/`,data);

    history.go(0);
}

export function* getCollectionsAsync(action) {
    const workspaceId = action.payload;
    console.log(action.payload);
    const response = yield axios.get(`http://localhost:4000/collection?workspaceId=${workspaceId}`);
    yield put(collectionActions.getCollectionsAsync(response.data)); 
  }
  