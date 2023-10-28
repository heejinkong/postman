import { createSlice } from '@reduxjs/toolkit';

// Redux 슬라이스 생성
export const workspaceSlice = createSlice({
    name: "workspace",

    initialState: { // 초기 상태 설정
        id:0,
        name: '',
        description: "" 
    },
    reducers: { // 액션 및  리듀서 정의
        // workspace 등록 리듀서
        registerWorkspace: (state, { payload: workspace }) => {
            console.log(workspace);
        },
        // workspace 가져오는 리듀서
        getWorkspace: (state, { payload: id }) => {
            console.log(id);
        },
        // 비동기 방식으로 workspace 가져오는 리듀서
        getWorkspaceAsync: (state, { payload: workspace }) => {
            return {
                ...state,
                id: workspace.id,
                name: workspace.name,
                description: workspace.description,
            };
        },
        // workspace 데이터를 받는 리듀서
        receiveWorkspaceData: (state, action) => {
            const { id, name, description } = action.payload;
            state.id = id;
            state.name = name;
            state.description = description;
          },

          updateWorkspace: (state, { payload: workspace }) => {
            // id가 없을 때는 null이 아닌 현재 상태 유지
            if (!workspace.id) return state;

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