import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./slice/rootSlice";
import rootSaga from "./sagas/rootSaga";
import history from "./utils/history";

const sagaMiddleware = createSagaMiddleware({
  context: { history: history },
  //history 객체를 context로 sagaMiddleware에 전달
});
const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger], 
  devTools: true,
  preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

export default store;
