import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./slice/rootSlice";
import rootSaga from "./sagas/rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["workspaceReducers"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('로컬 스토리지에서 상태 복원 중 오류 발생', e);
    return undefined;
  }
};

const initialState = loadState(); 

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, logger],
  devTools: true,
  preloadedState: initialState, 
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Failed to save state to local storage:', e);
  }
});

export { store, persistor };
