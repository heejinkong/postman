import { combineReducers } from "redux";
import { workspaceReducers } from "./workspaceSlice";
import { listReducers } from "./listSlice";


const rootReducer = combineReducers({ workspaceReducers, listReducers });

export default rootReducer;