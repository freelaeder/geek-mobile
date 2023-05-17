import {createEntityAdapter, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";

export interface SearchKeyType {
    name:string;
    id:string
}

// 创建状态适配器
const searchKeyEntityAdaptor = createEntityAdapter<SearchKeyType>()


export const searchKeySlice = createSlice({
    name:'searchKey',
    initialState:searchKeyEntityAdaptor.getInitialState(),
    reducers:{
        // 添加一条
        addKey(state,action:PayloadAction<Pick<SearchKeyType, 'name'>>){
            searchKeyEntityAdaptor.addOne(state,{
                name:action.payload.name,
                id:nanoid()
            })
        },
        // 删除一条
        removeOneKey(state,action:PayloadAction<Pick<SearchKeyType, 'id'>>){
            searchKeyEntityAdaptor.removeOne(state,action.payload.id)
        },
        // 删除全部
        clearKey(state){
            searchKeyEntityAdaptor.removeAll(state)
        }

    }
})

// 导出搜索历史关键字状态选择器
export const searchKeySelectors = searchKeyEntityAdaptor.getSelectors<AppState>(state =>
    state.searchKey)
export const {addKey,removeOneKey,clearKey} = searchKeySlice.actions