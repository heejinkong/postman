import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState: { id:0, workspacetitle:"", description: "" },
    reducers: {
        registerWorkspace: (state, workspace) => {
            console.log(workspace);
            return {
                ...workspace,
                id:state.id,
            };
        },
        registerWorkspaceAsync: (state, { payload }) => {
            console.lolg(payload);
            return {
                ...state,
                id: payload.id,
            };
        },
    },
});

export const workspaceReducers = workspaceSlice.reducer;
export const workspaceActions = workspaceSlice.actions;