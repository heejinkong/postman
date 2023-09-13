import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState: { 
        id:0,
        workspacetitle:"",
        description: "" 
    },
    reducers: {
        registerWorkspace: (state, { payload: workspace }) => {
            console.log(workspace);
        },
        // registerWorkspaceAsync: (state, { payload }) => {
        //     console.lolg(payload);
        //     debugger;
        //     return {
        //         ...state,
        //         id: payload.id,
        //     };
        // },

        getWorkspace: (state, { payload: id }) => {
            console.log(id);
        },
        getWorkspaceAsync: (state, { payload: workspace }) => {
            console.log(workspace);
            return {
                ...state,
                id: workspace.id,
                name: workspace.name,
                description: workspace.description,
            };
        },

    },
});

export const workspaceReducers = workspaceSlice.reducer;
export const workspaceActions = workspaceSlice.actions;