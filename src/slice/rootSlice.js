import { combineReducers } from "redux";
import { workspaceReducers } from "./workspaceSlice";
import { workspaceListReducers } from "./workspaceListSlice";

const rootReducer = combineReducers({ workspaceReducers, workspaceListReducers });

export default rootReducer;