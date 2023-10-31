import { getContext, put } from "redux-saga/effects"
import { collectionActions } from "../slice/collectionSlice"

const saveCollectionDataToLocalStorage = (data) => {
    localStorage.setItem(`collection-${data.workspaceId}-${data.id}`, JSON.stringify(data))
}

export function* registerCollectionAsync(action) {
    const data = action.payload

    try {
        saveCollectionDataToLocalStorage(data);
        const history = yield getContext("history")
        yield history.push(`/workspaces/${data.workspaceId}/collections/${data.id}`)

        yield alert("저장")
        yield history.go(0)
    } catch (e) {
        console.error("에러 발생:", e);
    }
}

//  로컬스토리지에서 데이터 얻어옴
 const getCollectionDataFromLocalStorage = (workspaceId, id) => {
    const data = localStorage.getItem(`collection-${workspaceId}-${id}`);
    console.log(data);
    return data ? JSON.parse(data) : null;
  };
  
  export function* getCollectionAsync(action) {
    const { workspaceId, id } = action.payload;
    const data = getCollectionDataFromLocalStorage(workspaceId, id);
  
    if (data) {
      yield put(collectionActions.receiveCollectionData(data));
    } else {
      console.error("데이터를 찾을 수 없음");
    }
    
  }

  export function* updateCollectionAsync(action) {
    const { collection, workspaceId } = action.payload;
  
    try {
      const storedCollection = JSON.parse(localStorage.getItem(`collection-${workspaceId}-${collection.id}`));
  
      if (storedCollection) {

        storedCollection.collectionname = collection.collectionname;
        storedCollection.collectiontext = collection.collectiontext;
  
    
        localStorage.setItem(`workspace-${collection.workspaceId}-${collection.id}`, JSON.stringify(storedCollection));
  
        yield alert("업데이트 완료");
      } else {
        console.error("해당 ID의 작업 공간이 로컬 스토리지에 존재하지 않습니다.");
      }
    } catch (e) {
      console.error("에러 발생:", e);
    }
  }




  