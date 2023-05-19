// src/@types/comment.d.ts
// 评论项的类型
interface ArticleComment {
    com_id: string;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    like_count: number;
    reply_count: number;
    pubdate: string;
    content: string;
    is_liking: boolean;
    is_followed: boolean;
}

// 文章评论的类型
type CommentResponse = GeekResponse<{
    total_count: number;
    end_id: string | undefined;
    last_id: string | undefined;
    results: ArticleComment[];
}>;