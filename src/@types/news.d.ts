
// src/@types/news.d.ts
// 获取新闻列表参数对象类型
interface NewsState {
    // 频道ID
    channel_id: number;
    // 时间戳, 请求新的推荐数据传当前的时间戳, 请求历史推荐传指定的时间戳
    timestamp: string | null;
}

// 文章封面
interface Cover {
    type: 0 | 1 | 3;
    images: string[];
}

// 新闻对象
interface News {
    // 文章id
    art_id: string;
    // 作者id
    aut_id: string;
    // 文章标题
    title: string;
    // 作者姓名
    aut_name: string;
    // 评论数量
    comm_count: number;
    // 发布时间
    pubdate: string;
    // 是否置顶
    is_top: number;
    // 文章封面
    cover: Cover;
}

// 新闻列表 API 返回值类型
type NewsResponse = GeekResponse<{
    pre_timestamp: string;
    results: News[];
}>;