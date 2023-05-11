// src/pages/home/widgets/updateUserChannel/widgets/unselected/index.tsx
import React from "react";
import styles from "@styles/edit.module.less";
import {
    useRequestAllChannelsQuery,
    useRequestUserChannelsQuery
} from "@service/channelEndpoints";
import Item from "@pages/home/widgets/unselected/Item";

function getRemaining(all: Channel[], user: Channel[]) {
    const remaining = all.filter(item => !user.some(userItem => userItem.id === item.id));
    return remaining;
}

export default function Unselected() {
    //获取所有的频道
    const {data: all, isSuccess: allSuccess} = useRequestAllChannelsQuery(undefined)
    // 获取用户选择的频道
    const {data: user, isSuccess: userSuccess} = useRequestUserChannelsQuery(undefined)
    // 如果所有频道列表或者用户频道列表没有获取成功, 阻止程序继续运行
    if (!allSuccess || !userSuccess) return null
    const remaining = getRemaining(all.data.channels, user.data.channels)

    return (
        <>
            <div className={styles.title}>
                <h3>可选频道</h3>
            </div>
            <div className={styles.list}>
                {
                    remaining && remaining.map(item => <Item seq={user.data.channels.length} key={item.id}
                                                             channel={item}/>)
                }
            </div>
        </>
    );
}