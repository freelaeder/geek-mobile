import React from 'react';
import {useFollowUserMutation, useUnFollowUserMutation} from "@service/articleEndpoints";


interface Props {
    isFollow: boolean;
    userId: string
}

function Followbtn({isFollow, userId}: Props) {
    // 点击关注 / 取消关注
    const [follow] = useFollowUserMutation()
    const [unfollow] = useUnFollowUserMutation()

    const requestFollow = () => {
        console.log(isFollow,'isFollow')
        isFollow ? unfollow(userId) : follow(userId)
    }
    return (
        <button onClick={requestFollow}> {isFollow ? '已关注' : '关注'} </button>
    );
}

export default Followbtn;