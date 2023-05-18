import News from "@pages/home/widgets/news";

type ArticleStatus = {
    art_id:string;
    title:string;
    pubdate:string;
    aut_id:string;
    aut_name:string;
    aut_photo:string;
    is_followed:boolean;
    attitude:number;
    content:string;
    is_collected:boolean;
    like_count:number;
    comm_count:number;
    read_count:number;
} & News

type ArticleResponse = GeekResponse<ArticleStatus>