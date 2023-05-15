import {apiService} from "@service/index";


const newsEndpoints = apiService.injectEndpoints({
    endpoints:(build) => ({
        // 获取新闻列表
        requestNews:build.query<NewsResponse,NewsState>({
            query:(params) => ({
                url:'/articles',
                params
            })
        })
    })
})


export const {useLazyRequestNewsQuery} = newsEndpoints