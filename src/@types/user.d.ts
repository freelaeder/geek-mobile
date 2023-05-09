// src/@types/user.d.ts
type UserResponse = GeekResponse<{
    id: string;
    name: string;
    photo: string;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
}>;

type ProfileResponse = GeekResponse<{
    id:string;
    name:string;
    photo:string;
    mobile:string;
    gender:string;
    birthday:string
}>

// 修改用户数据时可以传递的参数
interface UserProfile {
    name:string;
    gender:string;
    birthday:string;
    intro:string
}