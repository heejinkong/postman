import { combineReducers } from "redux";
import { workspaceReducers } from "./workspaceSlice";
import { listReducers } from "./listSlice";
import { collectionReducers } from "./collectionSlice";

const rootReducer = combineReducers({ workspaceReducers, listReducers, collectionReducers });

export default rootReducer;