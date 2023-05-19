import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


// 创建评论状态适配器
const commentsEntityAdaptor = createEntityAdapter<ArticleComment>({
    selectId: (state) => state.com_id
})

export const commentSlice = createSlice<EntityState<ArticleComment>, {
    // 保存评论
    saveComment(state: Draft<EntityState<ArticleComment>>, action: PayloadAction<ArticleComment[]>): void
    // 删除评论
    clearComment(state: Draft<EntityState<ArticleComment>>): void
}, 'comment'>({
    name: 'comment',
    initialState: commentsEntityAdaptor.getInitialState(),
    reducers: {
        // 保存评论
        saveComment: commentsEntityAdaptor.addMany,
        // 删除评论
        clearComment: commentsEntityAdaptor.removeAll
    }
})


// 导出状态适配器
export const commentSelectors = commentsEntityAdaptor.getSelectors<AppState>(state =>
    state.comment)

// 导出操作方法
export const {saveComment, clearComment} = commentSlice.actions
