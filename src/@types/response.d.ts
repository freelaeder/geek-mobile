interface GeekResponse<T> {
    message: string,
    data: T
}


// 分页响应对象
interface GeekPaginationResponse<T> {
    message: string;
    data: {
        page: number;
        per_page: number;
        total_count: number;
        results: T[];
    };
}