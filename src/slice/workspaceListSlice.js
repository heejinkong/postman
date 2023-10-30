import { createSlice } from "@reduxjs/toolkit";

export const workspaceListSlice = createSlice({
    name: "workspaceList",
    initialState: {
      workspaceList: [],
      isLoading: true,
      isSuccess: false,
      error: null,
    },
    reducers: {
      getWorkspaceList: (state, { payload }) => {
        console.log("getWorkspaceList 액션 호출");
      },
      getWorkspaceListAsync: (state, { payload: data }) => {
        return {
          ...state,
          workspaceList: data,
          isSuccess: true,
          isLoading: false,
        };
      },
    },
  });

export const workspaceListReducers = workspaceListSlice.reducer;
export const workspaceListActions = workspaceListSlice.actions;