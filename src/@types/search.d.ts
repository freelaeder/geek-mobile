

// 搜索功能 - 联想建议
type SuggestionResponse = GeekResponse<{options:string[]}>

// 搜索请求结果，请求参数
interface RequestBody {
    page:number;
    per_page:number;
    q:string
}

// 搜索功能-搜索结果返回
type SearchResultResponse = GeekPaginationResponse<News>