import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AppState} from "@store/index";
import {resetCredentials, saveCredentials} from "@slice/credentials";


const request = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, api) => {
        // 监测是否存在token
        if (headers.has('authorization')) return headers
        // // 获取token，设置请求头
        const token = (api.getState()as AppState).credentials.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const apiService = createApi({
    reducerPath: 'apiReducer',
    baseQuery: async (args, api, extraOptions) => {
        // 发送请求
        const response = await request(args, api, extraOptions)
        // 进入判断，发生请求错误
        if (typeof response.error !== 'undefined' && response.error.status === 401) {
            const {router} = require('@router/index')
            // 获取当前页面路由信息, 为跳转做准备
            const {pathname, search, hash} = router.state.location
            //1.本地的refresh token
            const refresh_token = (api.getState() as AppState).credentials.refresh_token
            //2.如果本地没有refresh token,跳转到登录页面
            if (refresh_token) {
                //3.如果本地有refresh token,向服务端发送请求，获取新的toke
                const response = await request({
                    url: "/authorizations",
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${refresh_token}`,
                    },
                }, api, extraOptions)
                //4.如果新的token获取成功，将最新的token保存回本地
                if (typeof response.error === 'undefined') {
                    api.dispatch(saveCredentials({
                        token: (response.data as GeekResponse<{ token: string }>).data.token,
                        refresh_token
                    }))

                    // const headers = new Headers(args.headers);
                    // if (headers.get('authorization')) {
                    //     const token = store.getState().credentials.token;
                    //     if (token) {
                    //         headers.set('authorization', `Bearer ${token}`);
                    //     }
                    // }
                    // console.log(args, 'args--header--')
                    // console.log(headers.get('authorization'),'headers----------------------------------------')
                    // const token_now = (api.getState() as AppState).credentials.token
                    // console.log(token_now, 'token-------store--------')
                    // 重新发送原始请求
                    // return request({ ...args, headers }, api, extraOptions)
                    return request(args, api, extraOptions)
                } else {
                    // token 换取失败
                    api.dispatch(resetCredentials());
                    //6.如果token换取失败，跳转到登录
                    router.navigate({pathname: '/login',}, {replace: true, state: {form: pathname + search + hash}})
                }

                //5.使用新的token获取受保护资源并返回响应

            } else {
                //6.如果token换取失败，跳转到登录
                router.navigate({pathname: '/login',}, {replace: true, state: {form: pathname + search + hash}})
            }
        }
        return response
    },
    endpoints: () => ({})
})