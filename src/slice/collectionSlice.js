import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    id: 0,
    collectionname: "",
    collectiontext:"",
    date: Date.now(),
    workspaceId: 0,
  },
  reducers: {
    registerCollection: (state, { payload: collection }) => {
      console.log("collection 등록 액션"); 
    },

    getCollection: (state, { payload: { workspaceId, collectionId } }) => {
      console.log("collection 불러오기 액션");
    },

    getCollectionAsync: (state, { payload: collection }) => {
      return {
        ...state,
        id: collection.id,
        collectionname: collection.collectionname,
        collectiontext: collection.collectiontext,
        date: collection.date,
        workspaceId: collection.workspaceId,
      };
    },

    fetchCollection: (state, {payload:id})=> {
            
      console.log("fetchCollection");
  },

  },
});

export const collectionReducers = collectionSlice.reducer;
export const collectionActions = collectionSlice.actions;