import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    id: 0,
    collectionname: "",
    collectiontext:"",
    workspaceId: 0,
    collections: [],
  },
  reducers: {
    registerCollection: (state, { payload: collection }) => {
      console.log("collection 액션"); 
    },
    getCollectionsAsync: (state, { payload: list }) => {
      return {
        ...state,
        collections: list,
      };
    },
    updateWorkspaceId: (state, { payload: workspaceId }) => {
        state.workspaceId = workspaceId;
      },
  },
});

export const collectionReducers = collectionSlice.reducer;
export const collectionActions = collectionSlice.actions;