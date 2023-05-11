import {apiService} from "@service/index";
import {saveChannels} from "@slice/guestChannel";


export const channelApiService = apiService.enhanceEndpoints({
    addTagTypes: ['userChannels']
}).injectEndpoints({
    endpoints: (build) => ({
        // 获取用户频道list
        requestUserChannels: build.query<ChannelResponse, undefined>({
            query: () => ({
                url: '/user/channels'
            }),
            providesTags: ['userChannels'],
        }),
        // 获取访客频道列表
        // 由于访客频道列表不需要被自动缓存到 API Reducer 函数中
        // 所以此处使用 mutation 请求, mutation 请求不会缓存响应状态
        requestGuestChannels: build.query<ChannelResponse, undefined>({
            query: () => ({
                url: '/user/channels'
            }),
            async onQueryStarted(arg, api) {
                const res = await api.queryFulfilled
                api.dispatch(saveChannels(res.data.data.channels))
            }
        }),
        // 删除频道
        deleteChannel: build.mutation<null, string>({
            query: (id) => ({
                url: `/user/channels/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['userChannels']
        })
    })
})


export const {
    useRequestUserChannelsQuery,
    useLazyRequestGuestChannelsQuery,
    useDeleteChannelMutation
} = channelApiService