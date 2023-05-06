import {apiService} from "@service/index";
import {store} from "@store/index";


const userApiService = apiService.injectEndpoints({
    endpoints: (build) => ({
        // 获取用户信息
        requestUser: build.query<UserResponse, undefined>({
            query: () => ({
                url: '/user',
                headers: {
                    authorization: `Bearer ${store.getState().credentials.token}`
                }
            })
        })
    })
})


export const {useRequestUserQuery} = userApiService