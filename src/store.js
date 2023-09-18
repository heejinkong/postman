import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./slice/rootSlice";
import rootSaga from "./sagas/rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { workspaceReducers } from "./slice/workspaceSlice";

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const persistConfig = {
  key: "root", // 저장 키
  storage, 
  whitelist: ["workspaceReducers"], // 저장할 리듀서 이름
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, logger],
  devTools: true,
  preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };