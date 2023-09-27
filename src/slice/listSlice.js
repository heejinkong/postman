import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    isLoading: true,
    isSuccess: false,
    error: null,
  },
  reducers: {
    getList: (state, { payload }) => {
      console.log("getList 액션 호출");
    },
    getListAsync: (state, { payload: data }) => {
      const workspaceData = Object.keys(localStorage)
        .filter((key) => key.startsWith("workspace-"))
        .map((key) => JSON.parse(localStorage.getItem(key)));

      return {
        ...state,
        list: workspaceData || [],
        isSuccess: true,
        isLoading: false,
      };
    },
  },
});

export const listReducers = listSlice.reducer;
export const listActions = listSlice.actions;
