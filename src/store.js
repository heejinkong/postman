import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./slice/rootSlice";
import rootSaga from "./sagas/rootSaga";
import history from "./utils/history";

const sagaMiddleware = createSagaMiddleware({// Redux Saga 미들웨어 생성 
  context: { history: history }, // Redux Saga에 context로 전달
  //history 객체를 context로 sagaMiddleware에 전달
});
const initialState = {};

const store = configureStore({ // Redux Store 초기값 설정
  reducer: rootReducer, // 모든 reducer 포함
  middleware: [sagaMiddleware, logger],  // logger - Redux 상태 기록하는 미들웨어
  devTools: true,
  preloadedState: initialState, // 초기 상태
});

sagaMiddleware.run(rootSaga); // 호출하여 rootSaga 실행

export default store;
