



// 频道列表
interface Channel{
    id:string;
    name:string;
}
// 频道响应对象
type ChannelResponse = GeekResponse<{channels:Channel[]}>