import { combineReducers } from "redux";
import { workspaceReducers } from "./workspaceSlice";

const rootReducer = combineReducers({ workspaceReducers });

export default rootReducer;