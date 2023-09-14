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
        return {
          ...state,
          list: data,
          isSuccess: true,
          isLoading: false,
        };
      },
    },
  });

export const listReducers = listSlice.reducer;
export const listActions = listSlice.actions;