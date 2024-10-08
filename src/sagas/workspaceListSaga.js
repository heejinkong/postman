import { put, takeEvery } from 'redux-saga/effects';
import { workspaceListActions } from '../slice/workspaceListSlice';

// 비동기 작업 함수
export function* getWorkspaceListAsync() {
  try {
    // 작업 내용
    const workspaceKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith('workspace-')
    );

    const workspaceData = workspaceKeys.map((key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    });

    if (workspaceData.length > 0) {
      yield put(workspaceListActions.getWorkspaceListAsync(workspaceData));
    } else {
      console.error('workspace list 존재하지 않음');
    }
  } catch (error) {
    console.error('Error', error);
  }
}


