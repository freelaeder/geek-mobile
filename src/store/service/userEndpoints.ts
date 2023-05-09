import {apiService} from "@service/index";


const userApiService = apiService.enhanceEndpoints({
    addTagTypes: ['profile']
}).injectEndpoints({
    endpoints: (build) => ({
        // 获取用户信息
        requestUser: build.query<UserResponse, undefined>({
            query: () => ({
                url: '/user',
                // headers: {
                //     authorization: `Bearer ${store.getState().credentials.token}`,
                // }
            })
        }),
        // 获取用户个人资料
        requestProfile: build.query<ProfileResponse, undefined>({
            query: () => ({
                url: '/user/profile'
            }),
            providesTags: ['profile']
        }),
        // 修改头像
        uploadAvatar: build.mutation<GeekResponse<{ id: string; photo: string }>, FormData>({
            query: (body) => ({
                url: '/user/photo',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['profile']
        }),
        // 修改名称
        updateProfile:build.mutation<GeekResponse<null>,Partial<UserProfile>>({
            query:(body) => ({
                url:'/user/profile',
                method: "PATCH",
                body
            }),
            invalidatesTags:['profile']
        })

    })
})


export const {useRequestUserQuery, useRequestProfileQuery, useUploadAvatarMutation,useUpdateProfileMutation} = userApiService