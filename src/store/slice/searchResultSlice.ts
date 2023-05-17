import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


// 创建搜索结果状态实体适配器
const searchEntityAdaptor = createEntityAdapter<News>({
    selectId: (news) => news.art_id
})

export const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState: searchEntityAdaptor.getInitialState(),
    reducers: {
        // 保存搜索结果
        saveResults: searchEntityAdaptor.addMany,
        // 清空搜索结果
        clearResults: searchEntityAdaptor.removeAll,
    }
})


// 导出状态选择器

export const searchSelectors = searchEntityAdaptor.getSelectors<AppState>(state =>
    state.searchResult)


export const {saveResults,clearResults} = searchResultSlice.actions