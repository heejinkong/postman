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
      const history = yield getContext("history")
      yield history.push(`/workspaces/${data.id}`)

      yield alert("저장");
      yield history.go(0);

     


    } catch (e) {
      console.error("에러 발생:", e);
    }
  }

  
  
  //로컬스토리지에서 데이터 얻어옴
const getWorkspaceDataFromLocalStorage = (id) => {
    const data = localStorage.getItem(`workspace-${id}`);

    console.log(data);
    return data ? JSON.parse(data) : null;
  };
  
  export function* getWorkspaceAsync(action) {
    const id = action.payload;

    const data = getWorkspaceDataFromLocalStorage(id);
  
    if (data) {
      yield put(workspaceActions.receiveWorkspaceData(data));
    } else {
      console.error("데이터를 찾을 수 없음");
    }
    
  }
  
  export function* updateWorkspaceAsync(action) {
    const workspace = action.payload;
  
    try {
      const storedWorkspace = JSON.parse(localStorage.getItem(`workspace-${workspace.id}`));
  
      if (storedWorkspace) {
        // Update the properties of storedWorkspace
        storedWorkspace.name = workspace.name;
        storedWorkspace.description = workspace.description;
  
        // Save the updated workspace data back to local storage
        localStorage.setItem(`workspace-${workspace.id}`, JSON.stringify(storedWorkspace));
  
        yield alert("업데이트 완료");
      } else {
        console.error("해당 ID의 작업 공간이 로컬 스토리지에 존재하지 않습니다.");
      }
    } catch (e) {
      console.error("에러 발생:", e);
    }
  }


  const deleteWorkspaceDataFromLocalStorage = (id) => {
    const data = localStorage.removeItem(`workspace-${id}`);

  };
  export function* deleteWorkspaceAsync(action) {
    const id = action.payload;
  
    yield deleteWorkspaceDataFromLocalStorage(id);
    alert("삭제");
    const history = yield getContext("history")
      yield history.push(`/`)
      yield history.go(0);
  }
  