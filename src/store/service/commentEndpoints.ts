import {apiService} from "@service/index";


const commentEndpoints = apiService.injectEndpoints({
    endpoints:build => ({
        // 获取所有的评论
        requestComments:build.query<CommentResponse,{
            type: "a" | "c"; source: string; offset?: string | null; limit?: number
        }>({
            query:(params) => ({
                url:'/comments',
                params
            })
        })
    })
})

//
export const {useLazyRequestCommentsQuery} = commentEndpoints