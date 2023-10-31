import { combineReducers } from "redux";
import { workspaceReducers } from "./workspaceSlice";
import { workspaceListReducers } from "./workspaceListSlice";
import { collectionReducers } from "./collectionSlice";

const rootReducer = combineReducers({ workspaceReducers, workspaceListReducers, collectionReducers });

export default rootReducer;