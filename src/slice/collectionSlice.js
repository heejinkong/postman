import { createSlice } from '@reduxjs/toolkit';

// Redux 슬라이스 생성
export const collectionSlice = createSlice({
    name: "collection",

    initialState: { // 초기 상태 설정
        id: 0,
      collectionname: '',
      collectiontext: '',
      workspaceId: 0,
      collections: [],
    },
    reducers: { // 액션 및  리듀서 정의
        // collection 등록 리듀서
        registerCollection: (state, { payload: collection }) => {
            console.log(collection);
        },
        getCollection: (state, { payload: {  id } }) => {
            console.log(id);
          },
        
          getCollectionAsync: (state, { payload: collection }) => {
            return {
              ...state,
              id: collection.id,
              collectionname: collection.collectionname,
              collectiontext: collection.collectiontext,
              workspaceId: collection.workspaceId,
            };
          },

          receiveCollectionData: (state, action) => {
            const { id, collectionname, collectiontext, workspaceId } = action.payload;
            state.id = id;
            state.collectionname = collectionname;
            state.collectiontext = collectiontext;
            state.workspaceId = workspaceId;
          },

          updatecollection: (state, { payload: collection }) => {
            // id가 없을 때는 null이 아닌 현재 상태 유지
            if (!collection.id) return state;

            return {
                ...state,
                id: collection.id,
                collectionname: collection.collectionname,
                collectiontext: collection.collectiontext,
                workspaceId: collection.workspaceId,
            };
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