import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    id: 0,
    collectionname: "",
    collectiontext:"",
    date: Date.now(),
    workspaceId: 0,
    collections: [],
  },
  reducers: {
    registerCollection: (state, { payload: collection }) => {
      console.log("collection 등록 액션"); 
    },

    getCollection: (state, { payload: { workspaceId, collectionId } }) => {
      console.log("collection 불러오기 액션");
    },

    getCollectionsAsync: (state, { payload: list }) => {
      return {
        ...state,
        collections: list,
      };
    },

  },
});

export const collectionReducers = collectionSlice.reducer;
export const collectionActions = collectionSlice.actions;