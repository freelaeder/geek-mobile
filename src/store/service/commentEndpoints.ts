import {apiService} from "@service/index";


const commentEndpoints = apiService.injectEndpoints({
    endpoints: build => ({
        // 获取所有的评论
        requestComments: build.query<CommentResponse, {
            type: "a" | "c"; source: string; offset?: string | null; limit?: number
        }>({
            query: (params) => ({
                url: '/comments',
                params
            })
        }),
        // 发表评论
        // 发表文章评论或对评论进行回复
        // target: 评论文章即为文章id，对评论进行回复则为评论id
        // content: 评论内容
        // art_id: 文章id, 对评论内容发表回复时需要传递此参数, 对文章进行评论不要传此参数
        publishComments: build.mutation<GeekResponse<{ com_id: string, target: string, art_id: string }>, {
            target: string, content: string, art_id: string
        }>({
            query: (body) => ({
                url: '/comments',
                method: 'post',
                body
            })
        })
    })
})

//
export const {useLazyRequestCommentsQuery,usePublishCommentsMutation} = commentEndpoints