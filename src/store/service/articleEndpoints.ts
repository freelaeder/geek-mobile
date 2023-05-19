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
        // 关注用户
        followUser: build.mutation({
            query: (id: string) => ({
                url: "/user/followings",
                method: "POST",
                body: {target: id},
            }),
            invalidatesTags: ["article"],
        }),
        // 取消关注用户
        unFollowUser: build.mutation({
            query: (id: string) => ({url: `/user/followings/${id}`, method: "DELETE"}),
            invalidatesTags: ["article"],
        }),
        // 收藏文章
        collectArticle: build.mutation({
            query: (id: string) => ({
                url: "/article/collections",
                method: "POST",
                body: {target: id},
            }),
            invalidatesTags: ["article"],
        }),
        // 取消收藏文章
        unCollectArticle: build.mutation({
            query: (id: string) => ({
                url: `/article/collections/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["article"],
        }),
        // 点赞
        likeArticle: build.mutation({
            query: (id: string) => ({
                url: '/article/likings',
                method: 'post',
                body: {
                    target: id
                }
            }),
            invalidatesTags: ['article']
        }),
        // 取消点赞
        unLikeArticle: build.mutation({
            query: (target: string) => ({
                url: `/article/likings/${target}`,
                method: 'delete'
            }),
            invalidatesTags:['article']
        })


    })
})


export const {
    useRequestArticleQuery,
    useFollowUserMutation,
    useUnFollowUserMutation,
    useCollectArticleMutation,
    useUnCollectArticleMutation,
    useLikeArticleMutation,
    useUnLikeArticleMutation
} = articleEndpoints