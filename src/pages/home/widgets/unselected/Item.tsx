import React, {useEffect} from 'react';
import {useAddUserChannelMutation} from "@service/channelEndpoints";
import toast from "react-hot-toast";

interface Props {
    channel: Channel;
    seq: number;
}

function Item({channel, seq}: Props) {


    // 点击添加频道
    const [addChannel, {isLoading, isSuccess}] = useAddUserChannelMutation()
    const addChannelBtn = () => {
        // 防止用户连续点击同一个频道
        if (isLoading) return toast.success("频道正在添加, 请耐心等待", {icon: "😜"})
        addChannel({channels: [{id: Number(channel.id), seq}]})
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('用户频道添加成功')
        }
    }, [isSuccess])
    return (
        <span onClick={addChannelBtn} key={channel.id}>+ {channel.name}</span>
    );
}

export default Item;