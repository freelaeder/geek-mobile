import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


const replyCommentsAdapter = createEntityAdapter<ArticleComment>({
    selectId: (x) => x.com_id
})


export const repaluSlice = createSlice<EntityState<ArticleComment>, {
    // 保存评论回复列表
    saveReplyComments(
        state: Draft<EntityState<ArticleComment>>,
        action: PayloadAction<ArticleComment[]>
    ): void;
    // 清空评论回复列表
    clearReplyComments(state: Draft<EntityState<ArticleComment>>): void;
}, 'reply'>({
    name: 'reply',
    initialState: replyCommentsAdapter.getInitialState(),
    reducers: {
        // 保存评论回复列表
        saveReplyComments: replyCommentsAdapter.addMany,
        // 清空评论回复列表
        clearReplyComments: replyCommentsAdapter.removeAll,
    }

})
export const {saveReplyComments,clearReplyComments} = repaluSlice.actions

export const replaySelectors = replyCommentsAdapter.getSelectors<AppState>(
    state => state.reply
)