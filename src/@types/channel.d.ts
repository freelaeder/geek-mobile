// 频道列表
interface Channel {
    id: string;
    name: string;
}


// 频道响应对象
type ChannelResponse = GeekResponse<{ channels: Channel[] }>


// 频道参数
interface ChannelState {
    id: number;
    seq: number;
}

// 添加频道响应对象

type AddChannelResponse = GeekResponse<{ channels: ChannelState[] }>