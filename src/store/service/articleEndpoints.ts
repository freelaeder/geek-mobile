import {apiService} from "@service/index";
import {ArticleResponse} from "../../@types/article";


const articleEndpoints = apiService.enhanceEndpoints({
    addTagTypes: ['article']
}).injectEndpoints({
    endpoints: build => ({
        // 获取文章详情
        requestArticle: build.query<ArticleResponse, string>({
            query: (id) => ({
                url: `/articles/${id}`
            }),
            providesTags: ['article']
        }),
        // 关注
        followUser: build.mutation({
            query: (id) => ({
                url: '/user/followings',
                method: 'POST',
                body: {
                    target: id
                }
            }),
            invalidatesTags: ['article']
        }),
        // 取消关注
        unFollowUser: build.mutation({
            query: (target) => ({
                url: `/user/followings/${target}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['article']
        })
    })
})


export const {
    useRequestArticleQuery,
    useFollowUserMutation,
    useUnFollowUserMutation
} = articleEndpoints