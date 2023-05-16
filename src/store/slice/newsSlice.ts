import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";

// 状态切片管理的状态的类型
interface ChannelNews {
    // 频道id -> 新闻列表
    [cid: string]: ChannelNewsItem;
}

interface ChannelNewsItem {
    results: News[];
    pre_timestamp: string | null;
    // 记录滚动位置
    distance: number;
}

export const newsSlice = createSlice<
    ChannelNews, {
    // 初始化状态
    initialChannel(state: Draft<ChannelNews>, action: PayloadAction<string>): void;
    // 保存新闻列表
    saveNews(state: Draft<ChannelNews>, action: PayloadAction<{
        cid: string;
        results: News[],
        pre_timestamp: string | null
    }>): void;
    // 保存滚动距离
    saveDistance(state: Draft<ChannelNews>, action: PayloadAction<{ cid: string, distance: number }>): void;
}, 'news'
>({
    name: 'news',
    initialState: {},
    reducers: {
        // 初始化状态
        initialChannel(state: Draft<ChannelNews>, action: PayloadAction<string>) {
            state[action.payload] = {
                results: [],
                pre_timestamp: Date.now() + "",
                distance: 0,
            };
        },
        // 保存新闻列表
        saveNews(state: Draft<ChannelNews>, action: PayloadAction<{
            cid: string;
            results: News[];
            pre_timestamp: string | null
        }>) {
            // 获取频道 id、新闻列表、上一页数据对应的时间戳, 是否有更多数据
            const {cid, results, pre_timestamp,} = action.payload
            // 保存新闻列表·
            state[cid].results.push(...results)
            // 保存时间戳
            state[cid].pre_timestamp = pre_timestamp
        },
        // 保存滚动距离
        saveDistance(state: Draft<ChannelNews>, action: PayloadAction<{ cid: string; distance: number }>) {
            const {cid, distance} = action.payload
            state[cid].distance = distance
        }
    }
})
// 新闻列表状态选择器
export const selectChannelNews =
    (cid: string) =>
        (state: AppState): undefined | ChannelNewsItem => {
            return state.news[cid];
        };


export const {saveNews, initialChannel,saveDistance} = newsSlice.actions