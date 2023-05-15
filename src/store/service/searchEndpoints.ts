import {apiService} from "@service/index";


export const searchEndpoints = apiService.injectEndpoints({
    endpoints:(build) => ({
        // 搜索-联想建议
        requestSuggestion: build.query<SuggestionResponse,string>({
            query:(key) => ({
                url:'/suggestion',
                params:{q:key}
            })
        })
    })
})


export const {useLazyRequestSuggestionQuery}  = searchEndpoints