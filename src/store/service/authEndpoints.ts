import {apiService} from "@service/index";
import {LoginResponse} from "../../@types/auth";
import {LoginFormState} from "@pages/login";
import {saveCredentials} from "@slice/credentials";


const authApiService = apiService.injectEndpoints({
    endpoints: (build) => ({
        // 登录注册
        login: build.mutation<LoginResponse, LoginFormState>({
            query: (body) => ({
                url: '/authorizations',
                method: 'post',
                body
            }),
            async onQueryStarted(arg, api) {
                // 获取服务器返回的数据
                const res = await api.queryFulfilled
                //保存store
                api.dispatch(saveCredentials(res.data.data))
            }

        }),
        // send msg code
        sendCode: build.query<GeekResponse<null>, string>({
            query: (mobile) => ({
                url: `/sms/codes/${mobile}`
            })
        })
    })
})

export const {useLoginMutation,useLazySendCodeQuery} = authApiService