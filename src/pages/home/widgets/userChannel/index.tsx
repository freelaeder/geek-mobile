import React from 'react';
import styles from "@styles/channel.module.less";
import classNames from "classnames";
import useChannelScroll from "@hooks/useChannelScroll";
import {useRequestUserChannelsQuery} from "@service/channelEndpoints";

function UserChannel() {
    const {scrollContainRef, scrollHandler} = useChannelScroll()
    // 获取数据-用户登录频道
    const {data} = useRequestUserChannelsQuery(undefined)
    return (
        <div className={styles.list} ref={scrollContainRef}>
            {data && data.data.channels.map((channel) => (
                <div onClick={(event) => scrollHandler(event.currentTarget)} key={channel.id}
                     className={classNames(styles.item)}>
                    {channel.name}
                </div>
            ))}
        </div>
    );
}

export default UserChannel;