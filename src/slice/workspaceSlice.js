import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    id: 0,
    name: '',
    description: '',
  },
  reducers: {
    registerWorkspace: (state, { payload: workspace }) => {
    },

    getWorkspace: (state, { payload: id }) => {

    },

    fetchWorkspace: (state, { payload: id }) => {
    },

    updateWorkspace: (state, { payload: workspace }) => {
        localStorage.setItem(`workspace-${workspace.id}`, JSON.stringify(workspace));
  
        return {
          ...state,
          id: workspace.id,
          name: workspace.name,
          description: workspace.description,
        };
      },
  
      
    deleteWorkspace: (state, { payload: id }) => {
      localStorage.removeItem(`workspace-${id}`);
    },
  },
});

export const workspaceReducers = workspaceSlice.reducer;
export const workspaceActions = workspaceSlice.actions;
