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