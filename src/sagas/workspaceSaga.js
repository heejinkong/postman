import { getContext, put } from "redux-saga/effects";
import { workspaceActions } from "../slice/workspaceSlice";


// 로컬스토리지에 데이터 저장
const saveWorkspaceDataToLocalStorage = (data) => {
    localStorage.setItem(`workspace-${data.id}`, JSON.stringify(data));
  };
  
  export function* registerWorkspaceAsync(action) {
    const data = action.payload;

    try {
      
      saveWorkspaceDataToLocalStorage(data);
  
      yield alert("저장");
      console.log(data.id); 

    } catch (error) {
      console.error("에러 발생:", error);
    }
  }
  
  //로컬스토리지에서 데이터 얻어옴
const getWorkspaceDataFromLocalStorage = (id) => {
    const data = localStorage.getItem(`workspace-${id}`);
    return data ? JSON.parse(data) : null;
  };
  
  export function* getWorkspaceAsync(action) {
    const id = action.payload;

    const data = getWorkspaceDataFromLocalStorage(id);
  
    if (data) {
      console.log(data);
      yield put(workspaceActions.getArticleAsync(data));
    } else {
      console.error("데이터를 찾을 수 없음");
    }
  }
  
