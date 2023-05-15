import React from 'react';
import {useTypedDispatch} from "@store/index";
import {addGuestChannel} from "@slice/guestChannel";

interface Props {
    channel:Channel
}
function GuestItem({channel}:Props) {
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    return (
        <span onClick={() => dispatch(addGuestChannel(channel)) }>+ {channel.name}</span>
    );
}

export default GuestItem;