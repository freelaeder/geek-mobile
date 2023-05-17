import {apiService} from "@service/index";


export const searchEndpoints = apiService.injectEndpoints({
    endpoints:(build) => ({
        // 搜索-联想建议
        requestSuggestion: build.query<SuggestionResponse,string>({
            query:(key) => ({
                url:'/suggestion',
                params:{q:key}
            })
        }),
        // 获取搜索结果
        requestResult:build.query<SearchResultResponse,RequestBody>({
            query:(params) => ({
                url: '/search',
                params
            })
        })
    })
})


export const {useLazyRequestSuggestionQuery,useLazyRequestResultQuery}  = searchEndpoints