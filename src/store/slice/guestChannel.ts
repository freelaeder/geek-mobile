import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


// 创建访客频道列表实体适配器
const guestChannelEntityAdapter = createEntityAdapter<Channel>()


export const guestChannelSlice = createSlice<EntityState<Channel>, {
    // 保存访客频道列表
    saveChannels: (state: Draft<EntityState<Channel>>, action: PayloadAction<Channel[]>) => void;
}, 'guestChannels'>({
    name: 'guestChannels',
    initialState: guestChannelEntityAdapter.getInitialState(),
    reducers: {
        // 保存访客频道列表
        saveChannels: guestChannelEntityAdapter.setAll,

    }
})

export const guestChannelSelectors = guestChannelEntityAdapter.getSelectors<AppState>(
    (state) => state.guestChannels
)

export const {saveChannels} = guestChannelSlice.actions